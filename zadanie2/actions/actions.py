from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
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