

Has a list of words. 

1) for each letter -> 
    if not used (grey)
        filter all words that contain
    if yellow 
        filter all words that DONT contain 
    if green
        filter all words that dont have letter in position 

2) Return from step one is 500 words how do we choose what is a good guess? 
    Apply a value to discern knowledge gained from guess?
        go through remaining list and get most common letter for each position 
        best guess is word with highest total of recurring letters.




        steak
        tears
        steps
        ST



    S 1->2    2->0    3->     4->    5->  
    t 1->1    2->2    3->     4->    5->  
    e 1->0    2->1    3->     4->    5->
    p 1->0    2->0    3->     4->    5->
    r 1->0    2->    3->     4->    5->
    a 1->0    2->    3->     4->    5->

2 2 2 1 2 Steps = 9

1 1 1 1 2 Tears = 6

...       Steak = 7 

        GUESS STEPS! 