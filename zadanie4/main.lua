WHITE = {255, 255, 255}
BLACK = {0, 0, 0}
GREEN = {0, 255, 0}
RED = {255, 0, 0}
BLUE = {0, 0, 255}
GRAY = {125, 125, 125}

blocks = {{{{0, 1, 0, 0}, {0, 1, 0, 0}, {0, 1, 0, 0}, {0, 1, 0, 0}},
           {{0, 0, 0, 0}, {1, 1, 1, 1}, {0, 0, 0, 0}, {0, 0, 0, 0}}},
          {{{0, 0, 0, 0}, {0, 1, 1, 0}, {0, 1, 1, 0}, {0, 0, 0, 0}}},
          {{{0, 0, 1, 0}, {0, 0, 1, 0}, {0, 1, 1, 0}, {0, 0, 0, 0}},
           {{0, 1, 1, 0}, {0, 1, 0, 0}, {0, 1, 0, 0}, {0, 0, 1, 0}},
           {{0, 0, 0, 0}, {1, 0, 0, 0}, {1, 1, 1, 0}, {0, 0, 0, 0}},
           {{0, 0, 0, 0}, {1, 1, 1, 0}, {0, 0, 1, 0}, {0, 0, 0, 0}}},
          {{{0, 0, 0, 0}, {0, 1, 0, 0}, {1, 1, 1, 0}, {0, 0, 0, 0}},
           {{0, 0, 0, 0}, {1, 1, 1, 0}, {0, 1, 0, 0}, {0, 0, 0, 0}},
           {{0, 1, 0, 0}, {0, 1, 1, 0}, {0, 1, 0, 0}, {0, 0, 0, 0}},
           {{0, 1, 0, 0}, {1, 1, 0, 0}, {0, 1, 0, 0}, {0, 0, 0, 0}}}}

WIDTH = 12
HEIGHT = 22
SIZE = 35

board = nil
time = nil
move_time = nil
state = nil
score = nil
block = nil
block_id = nil
block_x = nil
block_y = nil
next_block = nil
next_block_id = nil
rotation = nil

function love.load()
    math.randomseed(os.time())
    init()
end

function love.update(dt)
    if state == "GAME" then
        time = time + dt
        if time > move_time then
            move_down()
            time = 0
        end
    end
end

function love.draw()
    margin_x = WIDTH * SIZE

    love.graphics.setBackgroundColor(love.math.colorFromBytes(BLACK))

    love.graphics.setColor(love.math.colorFromBytes(RED))
    for i = 1, 4 do
        for j = 1, 4 do
            if block[i][j] == 1 then
                love.graphics.rectangle("fill", (block_x + j - 1) * SIZE, (block_y + i - 1) * SIZE, SIZE, SIZE)
            end
        end
    end

    love.graphics.setColor(love.math.colorFromBytes(RED))
    for i = 1, 4 do
        for j = 1, 4 do
            if next_block[i][j] == 1 then
                love.graphics.rectangle("fill", margin_x + (j + 2) * SIZE, (i + 2) * SIZE, SIZE, SIZE)
            end
        end
    end

    for i = 0, HEIGHT - 1 do
        for j = 0, WIDTH - 1 do
            if board[i][j] == "BLOCK" then
                love.graphics.setColor(love.math.colorFromBytes(RED))
                love.graphics.rectangle("fill", j * SIZE, i * SIZE, SIZE, SIZE)
            elseif board[i][j] == "WALL" then
                love.graphics.setColor(love.math.colorFromBytes(GRAY))
                love.graphics.rectangle("fill", j * SIZE, i * SIZE, SIZE, SIZE)
            end
        end
    end

    love.graphics.setColor(love.math.colorFromBytes(WHITE))
    for i = 0, HEIGHT do
        love.graphics.line(0, i * SIZE, WIDTH * SIZE, i * SIZE)
    end

    for i = 0, WIDTH do
        love.graphics.line(i * SIZE, 0, i * SIZE, HEIGHT * SIZE)
    end

    for i = 0, 4 do
        love.graphics.line(margin_x + (i + 3) * SIZE, 3 * SIZE, margin_x + (i + 3) * SIZE, 7 * SIZE)
        love.graphics.line(margin_x + 3 * SIZE, SIZE * i + 3 * SIZE, margin_x + SIZE * 7, SIZE * i + 3 * SIZE)
    end

    love.graphics.setColor(love.math.colorFromBytes(WHITE))
    love.graphics.setFont(love.graphics.newFont(35))
    love.graphics.print("TETRIS", margin_x + 3.3 * SIZE, 1 * SIZE)
    love.graphics.print("Score: " .. score, margin_x + 3 * SIZE, 7 * SIZE + SIZE / 2)

    love.graphics.setFont(love.graphics.newFont(20))
    love.graphics.print("S - START/SPEED", margin_x + 2.5 * SIZE, 10 * SIZE)
    love.graphics.print("P - PAUSE", margin_x + 2.5 * SIZE, 11 * SIZE)

    if state == "MENU" then
        love.graphics.print("L - LOAD", margin_x + 2.5 * SIZE, 12 * SIZE)
    end
    if state == "PAUSED" then
        love.graphics.print("K - SAVE", margin_x + 2.5 * SIZE, 12 * SIZE)
    end

    love.graphics.print("A - LEFT", margin_x + 2.5 * SIZE, 14 * SIZE)
    love.graphics.print("D - RIGHT", margin_x + 2.5 * SIZE, 15 * SIZE)
    love.graphics.print("SPACE - ROTATE", margin_x + 2.5 * SIZE, 16 * SIZE)

    love.graphics.print("ESC - QUIT", margin_x + 2.5 * SIZE, 18 * SIZE)

    if state == "LOST" then
        love.graphics.setColor(love.math.colorFromBytes(WHITE))
        love.graphics.setFont(love.graphics.newFont(58))
        love.graphics.print("GAME OVER", SIZE, (HEIGHT - 4) * SIZE / 2)
    end
end

function love.keypressed(key, scancode, isrepeat)
    if scancode == "s" and state == "GAME" then
        move_time = 0.05
    end

    if scancode == "s" and state == "LOST" then
        init()
        state = "GAME"
    end

    if scancode == "s" and (state == "PAUSED" or state == "MENU") then
        state = "GAME"
    end

    if scancode == "a" and state == "GAME" then
        move_left()
    end

    if scancode == "d" and state == "GAME" then
        move_right()
    end

    if scancode == "space" and state == "GAME" then
        rotate()
    end

    if scancode == "l" and state == "MENU" then
        load()
    end

    if scancode == "k" and state == "PAUSED" then
        save()
    end

    if scancode == "p" and state == "GAME" then
        state = "PAUSED"
    end

    if scancode == "escape" then
        love.event.quit()
    end
end

function love.keyreleased(scancode)
    if scancode == "s" and state == "GAME" then
        move_time = 0.5
    end
end

function init()
    board = {}
    for i = 0, HEIGHT - 1 do
        board[i] = {}
        for j = 0, WIDTH - 1 do
            if i == 0 or i == HEIGHT - 1 or j == 0 or j == WIDTH - 1 then
                board[i][j] = "WALL"
            else
                board[i][j] = "FREE"
            end
        end
    end

    time = 0
    move_time = 0.5
    state = "MENU"
    score = 0
    block = nil
    next_block = nil
    generate_block()
end

function generate_block()
    if next_block == nil then
        next_block_id = math.random(4)
    end

    block_id = next_block_id
    next_block_id = math.random(4)

    block_x = 4
    block_y = -3
    rotation = 1
    block = blocks[block_id][rotation]
    next_block = blocks[next_block_id][rotation]
end

function move_down()
    local collison = check_collision(block_x, block_y + 1, block)
    if collison == false then
        block_y = block_y + 1
    else
        add_block()
        reduce_lines()
        generate_block()
    end
end

function move_left()
    local collison = check_collision(block_x - 1, block_y, block)
    if collison == false then
        block_x = block_x - 1
    end
end

function move_right()
    local collison = check_collision(block_x + 1, block_y, block)
    if collison == false then
        block_x = block_x + 1
    end
end

function rotate()
    local new_rotation = rotation % #blocks[block_id] + 1
    local new_block = blocks[block_id][new_rotation]

    if check_collision(block_x, block_y, new_block) == false then
        rotation = new_rotation
        block = new_block
    end
end

function check_collision(x, y, candidate)
    for i = 1, 4 do
        for j = 1, 4 do
            if candidate[i][j] == 1 then
                local board_x = x + j - 1
                local board_y = y + i - 1

                if board[board_y] and board[board_y][board_x] and
                    (board[board_y][board_x] == "BLOCK" or (board[board_y][board_x] == "WALL" and board_y ~= 0)) then
                    return true
                end
            end
        end
    end
    return false
end

function add_block()
    for i = 1, 4 do
        for j = 1, 4 do
            if block[i][j] == 1 then
                local board_x = block_x + j - 1
                local board_y = block_y + i - 1
                if board[board_y] and board[board_y][board_x] and board[board_y][board_x] ~= "WALL" then
                    board[board_y][board_x] = "BLOCK"
                end
            end
        end
    end

    if check_game_over() then
        state = "LOST"
    end
end

function check_game_over()
    for i = 1, 4 do
        for j = 1, 4 do
            if block[i][j] == 1 then
                local board_y = block_y + i - 1
                if board_y == 0 then
                    return true
                end
            end
        end
    end
    return false
end

function reduce_lines()
    for i = 1, HEIGHT - 2 do
        local is_full = true
        for j = 1, WIDTH - 2 do
            if board[i][j] ~= "BLOCK" then
                is_full = false
                break
            end
        end
        if is_full then
            remove_line(i)
            shift_lines_down(i)
            score = score + 1
        end
    end
end

function remove_line(line)
    for j = 1, WIDTH - 2 do
        board[line][j] = "FREE"
    end
end

function shift_lines_down(start_line)
    for i = start_line, 2, -1 do
        for j = 1, WIDTH - 2 do
            board[i][j] = board[i - 1][j]
        end
    end
    for j = 1, WIDTH - 2 do
        board[1][j] = "FREE"
    end
end

function save()
    local gameStateString = ""

    for i = 0, HEIGHT - 1 do
        for j = 0, WIDTH - 1 do
            gameStateString = gameStateString .. board[i][j] .. ","
        end
    end

    gameStateString = gameStateString .. block_id .. ","
    gameStateString = gameStateString .. next_block_id .. ","
    gameStateString = gameStateString .. block_x .. ","
    gameStateString = gameStateString .. block_y .. ","
    gameStateString = gameStateString .. rotation .. ","
    gameStateString = gameStateString .. score

    local file = io.open("save.txt", "w")
    file:write(gameStateString)
    file:close()
    init()
end

function load()
    local file = io.open("save.txt", "r")

    if not file then
        return
    end

    local gameStateString = file:read("*all")
    file:close()

    local parts = {}
    for part in gameStateString:gmatch("[^,]+") do
        table.insert(parts, part)
    end

    local index = 1
    for i = 0, HEIGHT - 1 do
        for j = 0, WIDTH - 1 do
            board[i][j] = parts[index]
            index = index + 1
        end
    end

    block_id = tonumber(parts[index])
    index = index + 1
    next_block_id = tonumber(parts[index])
    index = index + 1
    block_x = tonumber(parts[index])
    index = index + 1
    block_y = tonumber(parts[index])
    index = index + 1
    rotation = tonumber(parts[index])
    index = index + 1
    score = tonumber(parts[index])

    block = blocks[block_id][rotation]
    next_block = blocks[next_block_id][rotation]

    state = "PAUSED"
end
