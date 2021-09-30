'''
Map function

map(function_to_apply, list_of_input)

'''


def square(n):
    return n**2


h1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

sq = map(square, h1)

print(list(sq))
