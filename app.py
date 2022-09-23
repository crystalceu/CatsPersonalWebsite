#from bottle import Bottle, static_file, request, run, template, route
from flask import Flask, render_template, request, redirect, url_for
import requests
from bs4 import BeautifulSoup

app = Flask(__name__, static_url_path='/static')

# kitten photos
# https://www.warrenphotographic.co.uk/34613-ginger-kitten-reaching-up
# pet breeds
# https://www.petfinder.com/cat-breeds/american-curl/

@app.route('/') # or @route('/login')
def index():
    return render_template('index.html')

@app.route('/second')
def fsecond():
    return render_template('second.html')

@app.route('/third')
def fthird():
    return render_template('third.html')

@app.route('/fourth')
def ffourth():
    return render_template('fourth.html')

@app.route('/search')#, methods = ["GET","POST"])
def fsearch():
    param = request.args['query']
    search_term = param.replace(" ","-")
    styles = """<link rel="stylesheet" type= "text/css" href="{{ url_for('static',filename='styles/styles.css') }}">"""
    if request.method == "GET":
        url = f'https://www.petfinder.com/cat-breeds/{search_term}/'
        page = requests.get(url)
        soup = BeautifulSoup(page.content, "html.parser")
        imageSrc = soup.find("img").get('src')
        headings = soup.find_all("div", class_="grid grid_gutterLg m-grid_alignBottom")
        file = open("./templates/html/characteristic.html", "w")
        buf = repr(headings)
        file.write(styles + "\n" + """<img src=" """ + imageSrc + """ ">""" + "\n" + buf[1:(len(buf) - 1)])
        file.close()
    return render_template('responsepage.html')

@app.route('/search/htmlchar')
def fhtml():
    return render_template('html/characteristic.html')

print('Serving on http://localhost:8080')

if __name__ == "__main__":
    app.run(debug=True)