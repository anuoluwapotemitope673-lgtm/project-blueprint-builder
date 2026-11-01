"""Render original concept deliverables from authored briefs, never modify/recolour stock mockups.
Run after exporting CONCEPT_BRIEFS to JSON; output is project-local, immutable per slug.
"""
import json, re, hashlib, textwrap, math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
BRIEFS = json.loads(Path('/tmp/portfolio-restructure/briefs.json').read_text())
DEST = ROOT / 'src/assets/portfolio'
DEST.mkdir(parents=True, exist_ok=True)
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
PALETTES = [('teal', '#16766b', '#eaf4f0'), ('coral', '#ba4649', '#faeeee'), ('olive', '#67763c', '#f2f4e8'), ('blue', '#386e91', '#edf3f7'), ('violet', '#735472', '#f5eff5')]

def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
def font(n=18, bold=False): return ImageFont.truetype(BOLD if bold else FONT, n)
def box(x,y,w,h,fill='#ffffff',border='#d8dedc',radius=8): d.rounded_rectangle((x,y,x+w,y+h),radius,fill=fill,outline=border,width=1)
def text(x,y,s,n=18,fill='#34413e',width=40,bold=False):
    for j,line in enumerate(textwrap.wrap(s,width=width)[:4]): d.text((x,y+j*(n+6)),line,font=font(n,bold),fill=fill)
def art(x,y,w,h,kind,seed):
    """Original illustration specific to the subject rather than a stock-photo substitute."""
    box(x,y,w,h,tint,tint)
    r=seed%4
    if any(k in kind.lower() for k in ['plant','care','linen','skincare','hair','materials','eco']):
        for j in range(3+r):
            xx=x+w*(j+1)/(4+r); yy=y+h*.7
            d.line((xx,yy,xx,yy-h*.45),fill=accent,width=4)
            d.ellipse((xx-25,yy-h*.4,xx+3,yy-h*.18),fill=accent)
            d.ellipse((xx,yy-h*.52,xx+29,yy-h*.29),fill=accent)
        d.rectangle((x+w*.3,y+h*.72,x+w*.7,y+h*.84),fill=accent)
    elif any(k in kind.lower() for k in ['coffee','meal','food','restaurant','cake','baker']):
        for j in range(2+r):
            xx=x+w*(j+1)/(3+r)
            d.ellipse((xx-30,y+h*.28,xx+30,y+h*.73),fill='#ffffff',outline=accent,width=3)
            d.arc((xx+15,y+h*.38,xx+48,y+h*.64),270,90,fill=accent,width=4)
    elif any(k in kind.lower() for k in ['jewelry','candle','toy','pet','gift','product']):
        for j in range(2+r):
            xx=x+w*(j+1)/(3+r)
            box(xx-24,y+h*.3,48,h*.44,'#ffffff',accent,12)
            d.line((xx-12,y+h*.5,xx+12,y+h*.5),fill=accent,width=3)
    else:
        for j in range(3+r):
            xx=x+w*(j+.5)/(3+r); yy=y+h*(.27 if j%2 else .55)
            d.ellipse((xx,yy,xx+w*.13,yy+h*.22),fill=accent)
            d.line((xx,yy+h*.3,xx+w*.13,yy+h*.3),fill=accent,width=3)

def chrome(title):
    box(55,100,914,610,'#ffffff','#cbd4d1',12)
    d.line((55,143,969,143),fill='#d8dedc',width=1)
    for j in range(3): d.ellipse((73+j*17,116,81+j*17,124),fill='#bac5c1')
    text(140,113,'Concept workspace  /  '+title,13,width=90)

def render(brief,index,cat):
    global im,d,accent,tint
    title,industry,sub,challenge,solution,items,tools,layout=brief
    _,accent,tint=PALETTES[(index+len(industry))%len(PALETTES)]
    im=Image.new('RGB',(1024,768),'#e6eae7'); d=ImageDraw.Draw(im)
    text(55,28,industry.upper()+'  /  '+sub.upper(),14,width=95,bold=True)
    text(55,55,title,25,width=62,bold=True)
    chrome(title)
    variant=index%4
    if layout in ['flow','funnel']:
        text(88,169,'PROCESS BLUEPRINT',13,bold=True)
        stages=items+[('Review & handoff' if cat!='email' else 'Preference check')]
        if variant%2:
            for j,s in enumerate(stages):
                x=100+(j%2)*440;y=215+(j//2)*205
                box(x,y,350,137,tint);text(x+18,y+17,str(j+1).zfill(2),24,accent,bold=True)
                text(x+18,y+58,s,19,width=24,bold=True)
                if j<len(stages)-1: d.line((x+175,y+140,x+175,y+177),fill=accent,width=3)
        else:
            for j,s in enumerate(stages):
                y=208+j*113; x=130+j*48 if layout=='funnel' else 120
                box(x,y,760-j*96 if layout=='funnel' else 760,89,tint)
                text(x+22,y+16,str(j+1).zfill(2)+'  '+s,20,width=54,bold=True)
                text(x+22,y+51,'Draft specification • human review',13,width=70)
                if j<len(stages)-1:d.line((490,y+90,490,y+111),fill=accent,width=3)
    elif layout=='calendar':
        text(88,170,'EDITORIAL APPROVAL BOARD',15,bold=True)
        cols=3+variant%2; cw=840/cols
        for j in range(cols):
            x=87+j*cw;text(x+8,209,['Plan','Create','Review','Schedule'][j],17,bold=True)
            for k in range(2+(j+variant)%2):
                y=254+k*133;box(x+4,y,cw-16,115,tint)
                text(x+18,y+14,items[(j+k)%len(items)],16,width=int(cw/10),bold=True)
                text(x+18,y+79,['Draft','Needs review','Ready'][k%3],12,accent)
    elif layout in ['feed','carousel']:
        count=3 if layout=='carousel' else 6; cols=3;cw=267
        for j in range(count):
            x=91+(j%cols)*282;y=181+(j//cols)*251
            box(x,y,cw,230,tint)
            if (j+variant)%3==0:
                text(x+18,y+20,items[j%len(items)],23,accent,width=16,bold=True)
                art(x+16,y+117,cw-32,92,title,index+j)
            elif (j+variant)%3==1:
                art(x+15,y+14,cw-30,131,title,index+j);text(x+16,y+159,items[j%len(items)],17,width=22,bold=True)
            else:
                text(x+18,y+15,str(j+1).zfill(2),35,accent,bold=True)
                text(x+18,y+78,items[j%len(items)],22,width=17,bold=True)
                d.line((x+18,y+199,x+cw-18,y+199),fill=accent,width=3)
        if layout=='carousel':
            text(95,463,'Creative sequence',22,bold=True)
            text(95,504,solution,18,width=77)
            text(95,638,'Illustrative artwork • no client performance claims',13,width=85)
    elif layout=='phone':
        count=2+variant%2;pw=230;start=(1024-count*(pw+30)+30)/2
        for j in range(count):
            x=start+j*(pw+30);box(x,173,pw,497,'#26322e','#26322e',25);box(x+9,185,pw-18,471,'#ffffff','#ffffff',18)
            text(x+21,205,['Explore','Prepare','Review'][j],16,bold=True)
            art(x+20,243,pw-40,183,title,index+j)
            text(x+21,444,items[j%len(items)],19,width=15,bold=True)
            box(x+20,582,pw-40,43,accent,accent);text(x+35,593,'View details',14,'#ffffff')
    elif layout in ['email','report']:
        if layout=='email':
            box(78,160,240,520,tint);text(94,180,'Message outline',17,bold=True)
            for j,it in enumerate(items):text(94,234+j*120,it,17,width=18,bold=True)
            x=347;w=587
        else:x=88;w=848
        text(x+19,172,('DESIGN DOCUMENT' if layout=='report' else 'EMAIL CONCEPT'),13,accent,bold=True)
        text(x+19,209,title,24,width=int(w/17),bold=True)
        if variant%2:art(x+20,301,w-40,147,title,index)
        else:
            for j,it in enumerate(items):
                bx=x+20+j*(w-40)/3;box(bx,312,(w-65)/3,136,tint);text(bx+12,329,it,15,width=int(w/30),bold=True)
        text(x+20,475,solution,17,width=int(w/10))
        text(x+20,605,'Planning draft • intended benefit, not a measured result',12,width=int(w/7))
    elif layout in ['dashboard','community']:
        box(68,155,183,542,tint);text(83,178,'Workspace',18,bold=True)
        for j,label in enumerate(['Overview']+items):text(84,230+j*78,label,14,width=18)
        text(279,176,('Discussion spaces' if layout=='community' else 'Review & decisions'),23,bold=True)
        for j,it in enumerate(items):
            y=229+j*142;box(278,y,658,123,'#ffffff')
            art(293,y+13,119,94,title,index+j)
            text(430,y+18,it,19,width=35,bold=True)
            text(430,y+66,('Draft discussion prompt' if layout=='community' else 'Not yet recorded • source required'),14,width=43)
    elif layout=='lesson':
        box(80,160,617,329,tint);art(103,186,570,230,title,index)
        d.polygon([(376,264),(376,340),(433,302)],fill='#ffffff')
        box(715,160,230,510);text(730,184,'Lesson resources',16,bold=True)
        for j,it in enumerate(items):text(730,241+j*111,it,17,width=17)
        text(98,521,items[0],24,width=40,bold=True);text(98,568,solution,17,width=53)
    elif layout in ['store','product']:
        text(87,164,'COLLECTION CONCEPT' if layout=='store' else 'PRODUCT EXPERIENCE',14,accent,bold=True)
        if layout=='store':
            art(87,205,837,155,title,index)
            cols=3+variant%2;cw=837/cols
            for j in range(cols):
                x=87+j*cw;art(x+4,385,cw-14,168,title,index+j);text(x+9,574,items[j%len(items)],16,width=int(cw/10),bold=True)
        else:
            art(86,210,448,370,title,index)
            text(566,215,title,24,width=23,bold=True)
            for j,it in enumerate(items):box(566,338+j*83,357,66,tint);text(582,354+j*83,it,16,width=31)
            text(94,612,'Illustrative selection • no live purchase or pricing',13,width=90)
    else:
        # Individually structured website concept: side-led, full editorial, or split feature layouts.
        text(87,163,'HOME    EXPLORE    INFORMATION    CONTACT',13,width=90)
        if variant==0:
            art(88,211,366,411,title,index);text(490,221,title,29,width=24,bold=True);text(490,340,solution,18,width=38)
            for j,it in enumerate(items):text(491,487+j*55,it,16,width=35,bold=True)
        elif variant==1:
            text(92,211,title,31,width=49,bold=True);art(93,319,826,181,title,index)
            for j,it in enumerate(items):text(96+j*278,538,it,17,width=22,bold=True)
        elif variant==2:
            text(91,216,title,31,width=27,bold=True);art(556,205,364,220,title,index)
            text(91,364,solution,17,width=40)
            for j,it in enumerate(items):box(92+j*278,482,258,169,tint);text(111+j*278,507,it,20,width=17,bold=True)
        else:
            art(88,207,830,169,title,index)
            text(91,404,title,28,width=55,bold=True)
            for j,it in enumerate(items):text(97,488+j*49,str(j+1).zfill(2)+'  '+it,18,width=70,bold=True)
    path=DEST/(slug(title)+'.webp');im.save(path,'WEBP',quality=92,method=6)
    return path

if __name__=='__main__':
    paths=[]
    for cat,briefs in BRIEFS.items():
        for brief in briefs:paths.append(render(brief,len(paths),cat))
    hashes=[hashlib.sha256(p.read_bytes()).hexdigest() for p in paths]
    assert len(paths)==150 and len(set(hashes))==150
    print('Rendered 150 original project-specific concept images; 150 distinct file hashes.')