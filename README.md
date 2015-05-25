#基于WebGL的虚拟现实眼镜的实现
#Realization of Virtual Reality Glasses based on WebGL
---
##摘要
>1981年，还是数学家的费诺·文奇（Venor Vinge）在他的传世名作《真名实姓》中描述了一个虚拟世界，黑客们以巫师的名义行走。这个世界外的世界就是VR（虚拟现实，Virtual Reality），由计算机模拟的，沉浸式全景多媒体，复写创造感官体验，包括虚拟的视觉、味觉、触觉、声音等等。<br>
自然世界大致是连续的，计算机模拟的数据是离散的，经过多年来的努力，来自美国的Oculus VR公司创造出了Oculus Rift头盔显示器，它将图像分别射入左右眼，并通过头部动作追踪使视角随用户的操作改变，让人如入实景。<br>
Oculus Rift被众人捧之为民用虚拟现实领域里程碑之作，然而成本并不低廉，以至于它被发布了两年仍未上市。在谷歌法国巴黎部门的两位工程师大卫·科兹(David Coz)和达米安·亨利(Damien Henry)利用了谷歌著名的“20%时间”规定，花了6个月的时间打造出来了CardBoard创意，意在将智能手机变成一个虚拟现实的原型设备，这个看起来非常寒碜的再生纸板盒却成了2014年谷歌I/O大会上最令人惊喜的产品，现在你可以用几十元人民币就可以在淘宝购买到以cardboard为原型的工程塑料制品。<br>
本文提出的基于WebGL的虚拟现实的实现将CardBoard的成本再一次降低，使得只要使用了支持WebGL浏览器的智能设备都可以体验。本产品实现了全景场景展示，利用输入设备（如重力感应、鼠标等）实现动作追踪功能，并利用光线追踪算法实现用户对物品的选定和场景切换。最后本产品基于JavaScript的原型机制对外开放出API，并利用该API制作了三个简单的应用，分别是全景图展示、电影选座以及简单的增强现实实现。<br>
***关键词:*** 虚拟现实;WebGL;JavaScript

##Abstract
>In 1981, as a Mathematician Venor Vinge described a virtual world in his famous book <i>True Names</i>, where hackers can walk around as wizards. This world out of the true world is VR, Virtual Reality. A computer simulated muti-media device which shows an immersion panoramic view and duplicates your sensory experience, virtual visions, tastes, tactile sensations, sounds etc.<br>
The natual world is roughly continuous, and computer simulations of the data are discrete.After years of hard work, Oculus VR, a company from the United States, created a helmet monitor named Oculus Rift. The device projects two different images to the eyes, and uses head motion tracking to change the visual angle following the user's operation to make a visual world.<br>
Oculus Rift was held as a milestone for the field of civil vitual reality, yet the cost is not cheap, that it was released for two years and not marketed.David Coz and Damien Henry are two engineers works in the Google Paris Department. By the provision of Google's famous "20% time", they spent 6 months to built out the idea of CardBoard , which was intended to use samrtphone as a vitual reality prototype. This looks very shabby recycled cardboard box is the most amazing product on 2014 Google I/O Conference.And now you can buy a plastic one in Taobao with a few dozens of yuan.<br>
The virtual reality based on WebGL proposed in this paper will reduce the cost of CardBoard again.It lets everyone who holds a device with a webGL supported web browser experience VR. The product realizes a panoramic scene play, using input devices, such as gravity sensor, a mouse etc. to achieve motion tracking function, and uses light tracing algorithm for user picking items and changing scenes. Finally, using JavaScript's prototype mechanism, the product exposes API for APPs. In this paper, three simple application are made. Panorama, a gallery shows panoramas. Movie, an application to choose the best seat in a cinema and NoodleFace, a simple realization of augmented reality.<br>
***Keywords:*** Vitual Reality;WebGL;JavaScript

##绪论
###课题研究的背景及其意义
虚拟现实(Virtual Reality，简称VR，又译作灵境、幻真)是近年来出现的高新技术，也称灵境技术或人工环境。虚拟现实是利用电脑模拟产生一个三维空间的虚拟世界，提供使用者关于视觉、听觉、触觉等感官的模拟，让使用者如同身历其境一般，可以及时、没有限制地观察三度空间内的事物。
北京时间2015年1月22日凌晨微软(Microsoft)公司发布了旗下的第一款全息眼镜HoloLens如图1.1,当然这不是世界上的第一款以虚拟现实为技术的设备，遗憾的是这些设备很笨重，长时间佩戴会给用户带来眩晕的感觉，而且最重要的，他们都价格不菲，这些问题直接导致虚拟现实这一技术仅能停滞于概念上。


<center>![HoloLens的宣传图片](http://img.news.d.cn/UE/net/UEUpload/6355753636324962506253676.jpg)</center>


虚拟现实技术演变发展史大体上可以分为四个阶段，包括有声音、形状、动作的模拟是蕴含虚拟现实思想的第一阶段（1963年以前）、虚拟现实萌芽为第二阶段（1963年～1972年）、虚拟现实概念的产生和理论初步形成为第四阶段（1990~2004年）。随着虚拟现实的逐步完善，该技术也逐渐从科幻片走进人们的生活，如图1.2是谷歌全球趋势对虚拟现实技术从2014年1月至2016年2月的统计及预测。


<center>![谷歌全球趋势对虚拟现实技术从2014年1月至2016年2月的统计及预测](http://ww1.sinaimg.cn/large/89d0a2e1gw1esgbxj2xlcj20g004y3yk.jpg)</center>


WebGL是一种3D绘图标准，这种标准允许把JavaScript和OpenGL ES 2.0结合在一起通过增加OpenGL ES 2.0的一个JavaScript绑定，WebGL可以为HTML5 Canvas提供3D加速渲染，这样Web开发人员就可以借助系统显卡来在浏览器里流畅的展示3D场景了，还能创建复杂的导航和数据视觉。WebGL技术标准免去了开发网页专用渲染插件的麻烦，可用于具有复杂3D结构的网站页面，甚至可以用来设计3D网页游戏等等。


虚拟现实因为能给人带来沉浸似的感受所以能很好的利用于医疗、教育、娱乐、军事航天、室内设计、房产开发、工业仿真、应急推演等等方面，WebGL作为浏览器一级的3D渲染标准有着轻量、易移植的特点，若能很好的接合这两项技术，会为移动互联网行业带来一次强大的技术革新。





