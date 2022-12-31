from manim import *


def g1(x):
    return (x**3)/10

class example(Scene):
    def construct(self):
        plane = NumberPlane()
        self.play(Create(plane),run_time=5)
        self.wait(2)