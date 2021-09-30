men = ['Ram', 'Shyam']

women = ['Sita', 'Radha']

for i in range(0, len(men)):
    template='{} marry with {}'
    print(template.format(men[i],women[i]))



sample_list=['ram', 'meera', 'heera', 'movie']


print(' and '.join(sample_list))