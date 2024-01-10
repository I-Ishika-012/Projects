import tkinter as tk
from gtts import gTTS
from tkinter import filedialog
import PyPDF2

#THE CODE IS STRICTLY FOR TEXT BASED PDFS, IMAGE BASED PDFS ARE NOT SUPPORTED
def get_pdf_file_path():
    root = tk.Tk()
    root.withdraw()  
    file_path = filedialog.askopenfilename(
        title="Select PDF File",
        filetypes=[("PDF files", "*.pdf"), ("All files", "*.*")]
    )
    root.destroy() 
    return file_path

pdf_file_path = get_pdf_file_path()

with open(pdf_file_path, 'rb') as pdf_File:
    pdf_Reader = PyPDF2.PdfReader(pdf_File)
    count = len(pdf_Reader.pages)
    textList = []

    for i in range(count):
        try:
            page = pdf_Reader.getPage(i)    
            textList.append(page.extractText())
        except:
            pass

    textString = " ".join(textList)

    print(textString)

    language = 'en'

    if textString:
        myAudio = gTTS(text=textString, lang=language, slow=False)
        myAudio.save("Audio.mp3")
    else:
        print("The text to speak is empty.")
