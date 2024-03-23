import random

def generate_typos(intent):
    variants = []

    # Doubling the letter
    variants.append(''.join(random.choice([char + char, char]) for char in intent))

    # Replacing the first letter with the second
    if len(intent) > 1:
        variants.append(intent[1] + intent[0] + intent[2:])

    # Removes first letter
    variants.append(intent[1:])

    # Removes last letter
    variants.append(intent[:-1])

    # Changing random letter
    index = random.randint(0, len(intent) - 1)
    random_char = chr(random.randint(97, 122))
    variants.append(intent[:index] + random_char + intent[index + 1:])

    return variants

while True:
    intent = input("Provide intent: ")
    if intent.lower() == "exit":
        break

    typos = generate_typos(intent)
    for typo in typos:
        print(f"- {typo}")
