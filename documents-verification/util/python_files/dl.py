import argparse
ap = argparse.ArgumentParser()
ap.add_argument("-s", "--state", required = True,
	help = "Path to the state abbreviation file")
ap.add_argument("-c", "--city", required = True,
	help = "Path to the city codes  file")
ap.add_argument("-d", "--dl", required = True,
	help = "enter dl number")

args = vars(ap.parse_args())
dl=args['dl']
dl=dl.replace('-','')
accuracy=0

# check 1- checking dl no length

if(len(dl)<10):
    print("Not a valid DL number")
else:
   
    accuracy+=1

# -----end of check 1------
    
    
    

# check 2 - checking state codes

def split(word): 
    return [char for char in word]  
      
number=(split(dl))
import pandas as pd
state=args['state']
names=pd.read_csv(state)
valid_codes=names['Abbreviation'].astype(str).values.tolist()
for code in valid_codes:
    if(code==dl[0:2].upper()):
        accuracy+=1
        break

# -----end of check 2------
        
    
        
    
# check 3 - checking state+city codes
cityc=args['city']
codes=pd.read_csv(cityc)
city=codes['city'].astype(str).values.tolist()
for i in range(len(city)):
    city[i]=city[i].replace('-','')

for code in city:
    if(code==dl[0:4].upper()):
        accuracy+=1
        break
    
# -----end of check 3------
        
    
    

#check 4 - checking presence of 7 digit ID at the end of DL no.
        
dl_len=len(dl)
veh_no=dl[dl_len-1:dl_len-8:-1]
veh_no = unicode(veh_no, 'utf-8')
if(veh_no.isnumeric()):
    accuracy+=1
    
# -----end of check 4------




# check 5 - checking valid year
year=dl[4:dl_len-7]
len(year)
import datetime
current_year = datetime.datetime.now()
long=current_year.strftime("%Y")
short=current_year.strftime("%y")
if(len(year)==4):

    if(year<=str(long)):
        accuracy+=1
else:
    if(year<=str(short)):
        accuracy+=1

# -----end of check 5------
        
        
#calculating correctness of recognized DL no.
correctness=(accuracy/5)*100

print(correctness)