import sympy
from sympy.parsing.latex import parse_latex
import time
import os

def doit(input):
    parsed = parse_latex(input)
    evaluated = parsed.doit()
    return evaluated

def simplify(input):
    parsed = parse_latex(input)
    evaluated = parsed.doit().simplify()
    return evaluated

def print_latex(expr):
    return sympy.printing.latex(expr)

def plot(input):
    simplified = simplify(input)
    p1 = sympy.plotting.plot(simplified, show=False)
    check_plot_direrctory()
    plot_path = f"static/plot/{time.time()}.plot.png"
    p1.save(plot_path)
    return plot_path

def check_plot_direrctory():
    if not os.path.exists("static/plot"):
        os.mkdir("static/plot")