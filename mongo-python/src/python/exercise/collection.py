from pprint import pprint

# 3)
my_dict = {"name": "abc", "list": [1, 2, 4, 5]}
my_list = my_dict["list"]
length = len(my_list)

pprint(length)

# 2)
my_number = 1
my_number_two = 1
number_compare = my_number == my_number_two
string_compare = "name" not in "my name is radhey"
string_compare = "name" in "my name is radhey"
condition_compare = 3 > 2 < 4
my_bool = not bool(1)

# 1)
my_data = {1, 1, 1, 3, 3, 2, 2, 2, 8, "ss"}
my_data_updated = {4, 4, 5, 6, 7, 9, "sss"}
my_set = set(my_data)
my_set.difference(my_data_updated)
