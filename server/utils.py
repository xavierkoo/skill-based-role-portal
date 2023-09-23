import math
import random
import datetime


def get_random_id():
    """
    The function `get_random_id` generates a random 6-digit integer.
    :return: an integer value.
    """
    digits = [i for i in range(0, 10)]
    random_str = ""
    for i in range(6):
        index = math.floor(random.random() * 10)
        random_str += str(digits[index])
    return int(random_str)


def validate_date(date_string_1, date_string_2):
    """
    The function `validate_date` takes in two date strings in the format "YYYY-MM-DD" and returns True
    if the second date is greater than or equal to the first date, and False otherwise.

    :param date_string_1: The `date_string_1` parameter is a string representing a date in the format
    "YYYY-MM-DD"
    :param date_string_2: The `date_string_2` parameter is a string representing a date in the format
    "YYYY-MM-DD"
    :return: a boolean value. It returns True if date_2 is greater than or equal to date_1, and False
    otherwise.
    """
    date_1 = datetime.datetime.strptime(date_string_1, "%Y-%m-%d")
    date_2 = datetime.datetime.strptime(date_string_2, "%Y-%m-%d")

    if date_2 >= date_1:
        return True
    else:
        return False
