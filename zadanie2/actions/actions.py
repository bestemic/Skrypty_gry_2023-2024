from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import json
from datetime import datetime


class ActionListHours(Action):

    def name(self) -> Text:
        return "action_list_hours"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        with open('data/opening_hours.json') as file:
            data = json.load(file)
            message = "We are open:\n"
            
            for day, hours in data['items'].items():
                if hours['open'] == hours['close']:
                    message += f"{day}: closed\n"
                else:
                    message += f"{day}: {hours['open']}-{hours['close']}\n"
                
            dispatcher.utter_message(text=message)
        return []


class ActionIsOpen(Action):

    def name(self) -> Text:
        return "action_is_open"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        with open('data/opening_hours.json') as file:
            data = json.load(file)
            day = datetime.now().strftime('%A').lower().capitalize()
            hours = data['items'].get(day)
            current_hour = datetime.now().hour

            if hours['open'] <= current_hour < hours['close']:
                dispatcher.utter_message(text="Yes")
            else:
                dispatcher.utter_message(text="No")
        return []


class ActionOpenHours(Action):

    def name(self) -> Text:
        return "action_open_hours"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        with open('data/opening_hours.json') as file:
            data = json.load(file)
            day = tracker.get_slot('day').lower().capitalize()
            hours = data['items'].get(day)
            
            if hours['open'] == hours['close']:
                dispatcher.utter_message(text=f"On {day} we are closed.")
            else:
                dispatcher.utter_message(text=f"On {day} we are open {hours['open']}-{hours['close']}.")
        return []


class ActionOpenOn(Action):

    def name(self) -> Text:
        return "action_open_on"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        with open('data/opening_hours.json') as file:
            data = json.load(file)
            day = tracker.get_slot('day').lower().capitalize()
            hour = tracker.get_slot('hour')
            hours = data['items'].get(day)

            if 'AM' in hour or 'PM' in hour:
                hour = datetime.strptime(hour, '%I:%M%p').hour
            else:
                hour = datetime.strptime(hour, '%H:%M').hour            
            
            if hours['open'] <= hour < hours['close']:
                dispatcher.utter_message(text="Yes")
            else:
                dispatcher.utter_message(text="No")
        return []
    
    
class ActionMenu(Action):

    def name(self) -> Text:
        return "action_menu"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        with open('data/menu.json') as file:
            data = json.load(file)
            message = "Our menu:\n"
            
            for item in data['items']:
                name = item['name']
                price = item['price']
                message += f"{name}: ${price}\n"
                
            dispatcher.utter_message(text=message)
        return []
    
    
class ActionOrder(Action):

    def name(self) -> Text:
        return "action_order"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        with open('data/menu.json') as file:
            menu = [menu_item["name"] for menu_item in json.load(file)["items"]]
            item = tracker.get_slot("item")
            order_summary = tracker.get_slot("order") or []
            
            if item in menu:
                order_summary.append(f"{item}")
                dispatcher.utter_message(text="Adding to order")
                return [SlotSet("item", None), SlotSet("order", order_summary)]
            else:
                dispatcher.utter_message(text=f"We don't have {item} in menu.")
                return [SlotSet("item", None)]
            
            
class ActionExtraOrder(Action):

    def name(self) -> Text:
        return "action_extra_order"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        with open('data/menu.json') as file:
            menu = [menu_item["name"] for menu_item in json.load(file)["items"]]
            item = tracker.get_slot("item")
            keyword = tracker.get_slot("extra_keyword")
            extra_item = tracker.get_slot("extra_item")
            order_summary = tracker.get_slot("order") or []
            
            if item in menu:
                order_summary.append(f"{item} {keyword} {extra_item}")
                dispatcher.utter_message(text="Adding to order")
                return [SlotSet("item", None), SlotSet("order", order_summary), SlotSet("extra_keyword", None), SlotSet("extra_item", None)]
            else:
                dispatcher.utter_message(text=f"We don't have {item} in menu.")
                return [SlotSet("item", None), SlotSet("extra_keyword", None), SlotSet("extra_item", None)]

            
class ActionShowOrder(Action):

    def name(self) -> Text:
        return "action_show_order"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        order_summary = tracker.get_slot("order")

        if not order_summary:
            dispatcher.utter_message("You don't order anything.")
        else:
            message = "This is your order: \n"
            for item in order_summary:
                message += f"  {item}\n"                
            dispatcher.utter_message(text=message)
        return []
    
    
class ActionConfirm(Action):

    def name(self) -> Text:
        return "action_confirm"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        with open('data/menu.json') as file:
            menu = json.load(file)["items"]
            
            order_summary = tracker.get_slot("order")
            if not order_summary or len(order_summary) == 0:
                dispatcher.utter_message("Empty order, add something")
                return []
            
            time = 0
            price = 0
            
            for order in order_summary:
                for dish in menu:
                    if dish["name"] == order.split()[0].lower().capitalize():
                        time += dish["preparation_time"]
                        price += dish["price"]

            message = "Order: \n"
            for item in order_summary:
                message += f"  {item}\n"   
                             
            dispatcher.utter_message(text=message)
            dispatcher.utter_message(f"Order will be available for pick-up in {time} hours")
            dispatcher.utter_message(f"Price equal: {price}")
            
            return [SlotSet("order", None)]
        
        
class ActionAddress(Action):

    def name(self) -> Text:
        return "action_address"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        address = tracker.get_slot("address")

        if not address:
            dispatcher.utter_message(text="Sorry. Something get wrong. You can pick-up your food.")
        else:
            dispatcher.utter_message(f"Your order will be delivered to {address}")
        return []