import tkinter as tk
from PIL import Image, ImageTk
import random

#NOTE: This is a dice roll game. It will randomly roll two dice and display the result.
#NOTE: The dice images are STRCITLY  to be stored in the same directory as this program.
#NOTE: The dimensions of the window are subject to change with the dimensions of the dice images used.
#NOTE: This program was created by Ishika Dutta for the purpose of learning Python.
window = tk.Tk()
window.geometry("500x360")
window.title("Dice Roll")

dice = ["dice1.png", "dice2.png", "dice3.png", "dice4.png", "dice5.png", "dice6.png"]
image1 = ImageTk.PhotoImage(Image.open(random.choice(dice)))
image2 = ImageTk.PhotoImage(Image.open(random.choice(dice)))


label1 = tk.Label(window,image=image1)
label2 = tk.Label(window,image=image2)
label1.image = image1
label2.image = image2
label1.place(x=50,y=100)
label2.place(x=250,y=100)

def roll():
   # a = random.randint(1,6)
   # label = tk.Label(window,text=a).pack()
   # image = ImageTk.PhotoImage(Image.open(random.choice(dice)))
   image1 = ImageTk.PhotoImage(Image.open(random.choice(dice)))
   label1.config(image=image1) 
   label1.image = image1
   
   image2 = ImageTk.PhotoImage(Image.open(random.choice(dice)))
   label2.config(image=image2)
   label2.image = image2

button = tk.Button(window, text="Roll", width=25, height=2, bg="black", fg="white",font=("Helvetica", 15, "bold"), command=roll)
button.place(x=200,y=0)

window.mainloop()