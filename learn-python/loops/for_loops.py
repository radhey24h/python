lst = [1, 2, 3, 4, 5, 6, 7]

for item in lst:
    if not item % 2:
        print('it is a even number ', item)
    else:
        print('it is odd number ', item)

lst_with_dict = [(1, 2), ("radhey", "mishra")]

for x, y in lst_with_dict:
    print(x, y)

dict_with = {"firstname": "radhey", "lastname": "mishra"}

for a, b in dict_with.items():
    print(a, b)

lst_pass = [1, 2, 3, 4, 5, 6, 7]

for x in lst_pass:
    pass
print('do nothing')

for z in lst_pass:
    if z == 1:
            break
        print(f'number in for loop is: {z}')
    else:
        if z == 2:
            break
        print(f'number in for loop is: {z}')
