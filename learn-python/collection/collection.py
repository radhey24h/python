from pprint import pprint

# 1)
my_data = {1, 1, 1, 3, 3, 2, 2, 2, 8, "ss"}
pprint(my_data)
# ?
my_data_updated = {4, 4, 5, 6, 7, 9, "sss"}
pprint(my_data_updated)
# ?
my_set = set(my_data)
pprint(my_set)
# ?
my_set.difference(my_data_updated)
pprint(my_data_updated)


# 3)
my_dict = {"name": "abc", "list": [1, 2, 4, 5, 6]}
my_list = my_dict["list"]
length = len(my_list)

pprint(length)

