def greater_then_two(n):
    if n > 2:
        return True
    else:
        return False


h1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
greater_numbers = filter(greater_then_two, h1)

print(list(greater_numbers))
