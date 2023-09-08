def filter_dictionary(input_file):
    with open(input_file, 'r') as file:
        valid_words = file.read().splitlines()

    filtered_words = [f'"{word}"' for word in valid_words if len(word) >= 3]

    output_file = '/Users/tommyyu/Desktop/projects/word_hunt_solver/src/functions/filteredDictionary.txt'
    with open(output_file, 'w') as file:
        file.write(','.join(filtered_words))

    print('Filtering complete.')


filter_dictionary(
    '/Users/tommyyu/Desktop/projects/word_hunt_solver/src/dictionary.txt')
