#!/bin/bash

BOARD=(1 2 3 4 5 6 7 8 9)
PLAYER=X

print_board() {
    echo " ${BOARD[0]} | ${BOARD[1]} | ${BOARD[2]} "
    echo "---+---+---"
    echo " ${BOARD[3]} | ${BOARD[4]} | ${BOARD[5]} "
    echo "---+---+---"
    echo " ${BOARD[6]} | ${BOARD[7]} | ${BOARD[8]} "
    echo
}

check_winner() {
    local symbol=$1
    local i

    for i in 0 3 6; do
        if [[ ${BOARD[$i]} == $symbol && ${BOARD[$((i + 1))]} == $symbol && ${BOARD[$((i + 2))]} == $symbol ]]; then
            echo 1
            return
        fi
    done

    for i in 0 1 2; do
        if [[ ${BOARD[$i]} == $symbol && ${BOARD[$((i + 3))]} == $symbol && ${BOARD[$((i + 6))]} == $symbol ]]; then
            echo 1
            return
        fi
    done

    if [[ ${BOARD[0]} == $symbol && ${BOARD[4]} == $symbol && ${BOARD[8]} == $symbol ]]; then
        echo 1
        return
    fi
    if [[ ${BOARD[2]} == $symbol && ${BOARD[4]} == $symbol && ${BOARD[6]} == $symbol ]]; then
        echo 1
        return
    fi

    echo 0
}

check_full_board() {
    for cell in "${BOARD[@]}"; do
        if [[ $cell =~ [1-9] ]]; then
            echo 0
            return
        fi
    done
    echo 1
}

switch_players() {
    if [[ $PLAYER == "X" ]]; then
        PLAYER="O"
    else
        PLAYER="X"
    fi
}

play_with_computer() {
    while true; do
        print_board
        if [[ $PLAYER == "X" ]]; then
            read -p "Player ${PLAYER}, choose field [1-9]: " choice

            if [[ $choice =~ ^[1-9]$ ]]; then

                if [[ ${BOARD[$choice - 1]} =~ [1-9] ]]; then
                    BOARD[$choice - 1]=$PLAYER
                else
                    echo "This field is already occupied."
                    continue
                fi
            else
                echo "Invalid choice."
                continue
            fi
        else
            echo "Computer move."
            sleep 1

            local free_slots=()
            local i
            for i in "${!BOARD[@]}"; do
                if [[ ${BOARD[$i]} =~ [1-9] ]]; then
                    free_slots+=($i)
                fi
            done

            random_index=$((RANDOM % ${#free_slots[@]}))
            BOARD[${free_slots[$random_index]}]="O"
        fi

        if [ $(check_winner $PLAYER) -eq 1 ]; then
            print_board
            if [[ $PLAYER == "X" ]]; then
                echo "Player $PLAYER wins!"
                break
            else
                echo "Computer wins!"
                break
            fi
        elif [ $(check_full_board) -eq 1 ]; then
            print_board
            echo "The board is full."
            break
        else
            switch_players
        fi
    done
}

play_with_player() {
    while true; do
        print_board
        read -p "Player ${PLAYER}, choose field [1-9]: " choice

        if [[ $choice =~ ^[1-9]$ ]]; then

            if [[ ${BOARD[$choice - 1]} =~ [1-9] ]]; then
                BOARD[$choice - 1]=$PLAYER
            else
                echo "This field is already occupied."
                continue
            fi

            if [ $(check_winner $PLAYER) -eq 1 ]; then
                print_board
                echo "Player $PLAYER wins!"
                break
            elif [ $(check_full_board) -eq 1 ]; then
                print_board
                echo "The board is full."
                break
            else
                switch_players
            fi
        else
            echo "Invalid choice."
        fi
    done
}

load_save() {
    echo "Not implemented"
}

print_menu() {
    echo "1. Game with second player"
    echo "2. Game with computer"
    echo "3. Load saved game"
    echo "4. Exit"

    echo
    read -p "Choose game mode: " game_mode

    case $game_mode in
    1)
        play_with_player
        ;;
    2)
        play_with_computer
        ;;
    3)
        load_save
        ;;
    4)
        exit 0
        ;;
    *)
        echo -e "Incorrect input, provide numbers [1-4].\n"
        print_menu
        ;;
    esac
}

print_menu
