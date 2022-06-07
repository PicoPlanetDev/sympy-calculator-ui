from unittest import result
import sympy
from sympy.parsing.latex import parse_latex

def evaluate(input):
    parsed = parse_latex(input)
    evaluated = parsed.doit()
    latex = sympy.printing.latex(evaluated)
    return latex