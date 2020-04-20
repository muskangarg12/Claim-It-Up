#!/usr/bin/env python
# coding: utf-8

from PIL import Image, ImageEnhance
import pytesseract as pyTes
import cv2
import numpy as np
import sys
import re 
import json 

img_cv = cv2.imread(sys.argv[1])

#converting to greyscale
gray = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)

# applying binary threshold
ret,thresh = cv2.threshold(gray,102,255,cv2.THRESH_BINARY_INV) 

#dilating the  image
kernel = np.ones((15,20), np.uint8) 
img_dilation = cv2.dilate(thresh, kernel, iterations=1) 

#finding contours
ctrs, hier = cv2.findContours(img_dilation.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
sorted_ctrs = sorted(ctrs, key=lambda ctr: cv2.boundingRect(ctr)[1])


expr1 = r"^[0-9]{2}[-|—]{1}[0-9]{2}[-|—]{1}[0-9]{4}$"
expr2 = r"^[0-9]{2}[-|—]{1}[0-9]{2}[-|—]{1}[0-9]{2}$"
pattern1 = re.compile(expr1)
pattern2 = re.compile(expr2)
count = 0
dates = []

for i, ctr in enumerate(sorted_ctrs): 
    # Get bounding box 
    x, y, w, h = cv2.boundingRect(ctr) 
    # Getting ROI 
    roi = img_cv[y:y+h, x:x+w] 
    # Reading text
    if (w >= 30 and w < img_cv.shape[1]) and (h >= 30 and h < img_cv.shape[0]): 
        crop = Image.fromarray(roi)
        enhancer = ImageEnhance.Sharpness(crop)
        crop = enhancer.enhance(7.0)
        string = pyTes.image_to_string(crop)
        string = string.replace(' ', '')
        if pattern1.match(string) or pattern2.match(string):
            dates.append(string)
            count += 1
        if count == 3:
            break
length = len(dates)
if length == 3:
    dates_json = {'claimDate': dates[0], 'insuranceFrom' : dates[2], 'insuranceTo': dates[1]}
    print(json.dumps(dates_json))
if length == 2:
    dates_json = {'claimDate': dates[0], 'insuranceFrom' : dates[2], 'insuranceTo': '00-00-00'}
    print(json.dumps(dates_json))
if length ==1:
    dates_json = {'claimDate': dates[0], 'insuranceFrom' : '00-00-00', 'insuranceTo':'00-00-00'}
    print(json.dumps(dates_json))
if length ==0:
    dates_json = {'claimDate': '00-00-00', 'insuranceFrom' : '00-00-00', 'insuranceTo':'00-00-00'}
    print(json.dumps(dates_json))
