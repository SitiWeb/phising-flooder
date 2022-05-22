import tkinter as tk
import webbrowser
import urllib.request, json 

def show_entry_fields():
    for i in range(int(e2.get())):
        webbrowser.open_new_tab(e1.get())

def open_browser():
    with urllib.request.urlopen("https://raw.githubusercontent.com/SitiWeb/phising-flooder/main/data/data.json") as url:
        data = json.loads(url.read().decode())
        for key, value in data.items():
            webbrowser.open_new_tab(key)
            

    

master = tk.Tk()
tk.Label(master, 
         text="Url").grid(row=0)
tk.Label(master, 
         text="x Tabs").grid(row=1)

e1 = tk.Entry(master)
e2 = tk.Entry(master)

e1.grid(row=0, column=1)
e2.grid(row=1, column=1)

tk.Button(master, 
          text='Quit', 
          command=master.quit).grid(row=3, 
                                    column=0, 
                                    sticky=tk.W, 
                                    pady=4)
tk.Button(master, 
          text='Open', command=show_entry_fields).grid(row=3, 
                                                       column=1, 
                                                       sticky=tk.W, 
                                                       pady=4)
tk.Button(master, 
          text='Open all', command=open_browser).grid(row=3, 
                                                       column=2, 
                                                       sticky=tk.W, 
                                                       pady=4)

tk.mainloop()