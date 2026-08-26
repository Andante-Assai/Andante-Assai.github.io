---
layout: note
title: "矩阵乘法、张量、向量的共通本质"
date: 2026-06-30 20:15:10 +0800
excerpt: "矩阵乘法的本质是线性组合；矩阵乘法与张量积是同一个双线性结构的不同排布表现。"
keywords:
  - matrix multiplication
  - tensor
  - vector
  - linear algebra
permalink: /Notes/matrix-tensor-vector/
---



开门见山：**矩阵乘法的本质是线性组合。矩阵乘法与张量积，是同一个双线性结构的不同排布表现。**

### 1. 你目前知道的

考虑一个最简单的结构：把多个标量作为系数，打包进同一个线性组合。在二维平面中，选定两个基向量

\[
\mathbf e_1=
\begin{bmatrix}
1\\
0
\end{bmatrix},
\qquad
\mathbf e_2=
\begin{bmatrix}
0\\
1
\end{bmatrix}
\]

任意向量都可以写成

\[
\mathbf v=v_1\mathbf e_1+v_2\mathbf e_2
=
v_1
\begin{bmatrix}
1\\
0
\end{bmatrix}
+
v_2
\begin{bmatrix}
0\\
1
\end{bmatrix}
=
\begin{bmatrix}
v_1\\
v_2
\end{bmatrix}
\]

其中

\[
\begin{bmatrix}
v_1\\
v_2
\end{bmatrix}
=
\begin{matrix}
\underbrace{v_1}_{\mathbf e_1\text{ 方向贡献}}\\[6pt]
\underbrace{v_2}_{\mathbf e_2\text{ 方向贡献}}
\end{matrix}
\]

所以，向量记录的是一个对象在各个基方向上的标量贡献；更准确地说，**向量是基向量在标量系数下的线性组合。**

先比较竖着和横着的两种打包：

\[
\begin{bmatrix}
a\\
b
\end{bmatrix}
\qquad\text{和}\qquad
\begin{bmatrix}
a&b
\end{bmatrix}
\]

竖着的通常作为向量坐标。横着的 \(\begin{bmatrix}a&b\end{bmatrix}\) 不能简单理解成同一个几何箭头被放倒；它作为 \(1\times2\) 对象，也可以看成两个一维列并排打包：

\[
\begin{bmatrix}
a&b
\end{bmatrix}
=
\left[
\begin{array}{c|c}
[a]&[b]
\end{array}
\right]
\]

竖向位置记录一个输出对象内部的分量，横向位置区分不同基本输入所对应的输出。为什么两者作用不同，后面用协向量解释。

### 2. 张量的本质也是线性组合：把向量继续推广

如果不只想打包两个标量的线性组合，而是想打包两个向量的线性组合，就需要矩阵。

一个线性规则对两个基本输入分别输出标量：

\[
f(\mathbf e_1)=a,
\qquad
f(\mathbf e_2)=b
\]

对于

\[
\mathbf x=x_1\mathbf e_1+x_2\mathbf e_2
=
\begin{bmatrix}
x_1\\
x_2
\end{bmatrix}
\]

有

\[
f(\mathbf x)=x_1a+x_2b
\]

因此可以把两个标量输出并排记录为

\[
[f]
=
\begin{bmatrix}
\underbrace{a}_{\mathbf e_1\text{ 的输出}}
&
\underbrace{b}_{\mathbf e_2\text{ 的输出}}
\end{bmatrix}
\]

现在把输出升级成向量：

\[
T(\mathbf e_1)
=
\mathbf c_1
=
\begin{bmatrix}
c_{11}\\
c_{21}
\end{bmatrix},
\qquad
T(\mathbf e_2)
=
\mathbf c_2
=
\begin{bmatrix}
c_{12}\\
c_{22}
\end{bmatrix}
\]

那么

\[
T(\mathbf x)
=
x_1T(\mathbf e_1)+x_2T(\mathbf e_2)
=
x_1
\begin{bmatrix}
c_{11}\\
c_{21}
\end{bmatrix}
+
x_2
\begin{bmatrix}
c_{12}\\
c_{22}
\end{bmatrix}
\]

两个基本输入分别对应一个完整向量，所以把它们并排打包：

\[
[T]
=
\left[
\begin{array}{c|c}
\mathbf c_1&\mathbf c_2
\end{array}
\right]
=
\begin{bmatrix}
c_{11}&c_{12}\\
c_{21}&c_{22}
\end{bmatrix}
\]

并列比较：

\[
\begin{array}{c@{\qquad\Longrightarrow\qquad}c}
\text{标量输出}
&
\text{向量输出}
\\[8pt]
\begin{bmatrix}
a&b
\end{bmatrix}
&
\left[
\begin{array}{c|c}
\begin{bmatrix}
c_{11}\\
c_{21}
\end{bmatrix}
&
\begin{bmatrix}
c_{12}\\
c_{22}
\end{bmatrix}
\end{array}
\right]
\end{array}
\]

所以矩阵可以理解成：**原来横向排列的每个标量输出，都升级成一个完整列向量，也就是“向量套向量”。**

标量是 \(0\) 阶张量，向量是 \(1\) 阶张量；二阶张量记录输入方向与输出方向之间的关系。在一组基下，它可以写成

\[
T=
\begin{bmatrix}
T_{11}&T_{12}&T_{13}\\
T_{21}&T_{22}&T_{23}\\
T_{31}&T_{32}&T_{33}
\end{bmatrix}
=
\left[
\begin{array}{c|c|c}
\underbrace{
\begin{bmatrix}
T_{11}\\
T_{21}\\
T_{31}
\end{bmatrix}
}_{\mathbf e_1\text{ 输入的完整输出}}
&
\underbrace{
\begin{bmatrix}
T_{12}\\
T_{22}\\
T_{32}
\end{bmatrix}
}_{\mathbf e_2\text{ 输入的完整输出}}
&
\underbrace{
\begin{bmatrix}
T_{13}\\
T_{23}\\
T_{33}
\end{bmatrix}
}_{\mathbf e_3\text{ 输入的完整输出}}
\end{array}
\right]
\]

其中 \(T_{ij}\) 表示第 \(j\) 个输入方向对第 \(i\) 个输出方向贡献多少，因此列号记录输入方向，行号记录输出方向。

### 举个例子帮助说明：计算转动惯量

只绕一条固定轴转动时，

\[
L=I\omega
\]

这里 \(\omega,L\in\mathbb R\)，输入和输出都是标量，所以一个标量 \(I\) 已经足够。

一般刚体转动中，角速度和角动量都是向量：

\[
\boldsymbol\omega
=
\begin{bmatrix}
\omega_x\\
\omega_y\\
\omega_z
\end{bmatrix},
\qquad
\mathbf L
=
\begin{bmatrix}
L_x\\
L_y\\
L_z
\end{bmatrix}
\]

因此必须记录三个基本角速度输入分别产生怎样的完整角动量向量：

\[
\mathbf I(\mathbf e_x)
=
\begin{bmatrix}
I_{xx}\\
I_{yx}\\
I_{zx}
\end{bmatrix},
\qquad
\mathbf I(\mathbf e_y)
=
\begin{bmatrix}
I_{xy}\\
I_{yy}\\
I_{zy}
\end{bmatrix},
\qquad
\mathbf I(\mathbf e_z)
=
\begin{bmatrix}
I_{xz}\\
I_{yz}\\
I_{zz}
\end{bmatrix}
\]

把三个向量并排：

\[
\mathbf I
=
\left[
\begin{array}{c|c|c}
\mathbf I(\mathbf e_x)&
\mathbf I(\mathbf e_y)&
\mathbf I(\mathbf e_z)
\end{array}
\right]
=
\begin{bmatrix}
I_{xx}&I_{xy}&I_{xz}\\
I_{yx}&I_{yy}&I_{yz}\\
I_{zx}&I_{zy}&I_{zz}
\end{bmatrix}
\]

于是

\[
\mathbf L=\mathbf I\boldsymbol\omega
\]

这就是转动惯量为什么要从标量升级成二阶张量。

### 2.a 乘法的本质

两个标量相乘 \(ab\)，可以理解成一个量对另一个量进行一维线性变换。标量乘法满足

\[
ab=ba
\]

但在二维及更高维中，一个变换可以是旋转、拉伸、剪切或投影，一般有

\[
AB\ne BA
\]

所以高维乘法仍然保留“变换与复合”的本质，只是不再满足交换律。

### 2.b 张量之间的乘法 / 矩阵之间的乘法

矩阵乘向量时，右边提供系数，左边提供被线性组合的列。设

\[
A
=
\left[
\begin{array}{c|c}
\mathbf c_1&\mathbf c_2
\end{array}
\right]
=
\begin{bmatrix}
c_{11}&c_{12}\\
c_{21}&c_{22}
\end{bmatrix},
\qquad
\mathbf x=
\begin{bmatrix}
x_1\\
x_2
\end{bmatrix}
\]

则

\[
A\mathbf x
=
\underbrace{x_1\mathbf c_1}_{\text{第一列贡献}}
+
\underbrace{x_2\mathbf c_2}_{\text{第二列贡献}}
=
x_1
\begin{bmatrix}
c_{11}\\
c_{21}
\end{bmatrix}
+
x_2
\begin{bmatrix}
c_{12}\\
c_{22}
\end{bmatrix}
\]

矩阵乘矩阵只是同时处理右边矩阵的多列。若

\[
B
=
\left[
\begin{array}{c|c}
\mathbf b_1&\mathbf b_2
\end{array}
\right]
=
\begin{bmatrix}
b_{11}&b_{12}\\
b_{21}&b_{22}
\end{bmatrix}
\]

则

\[
AB
=
\left[
\begin{array}{c|c}
A\mathbf b_1&A\mathbf b_2
\end{array}
\right]
=
\left[
\begin{array}{c|c}
b_{11}\mathbf c_1+b_{21}\mathbf c_2
&
b_{12}\mathbf c_1+b_{22}\mathbf c_2
\end{array}
\right]
\]

所以矩阵乘矩阵，就是许多次矩阵乘向量，再把输出按列重新打包。

### 内积与外积：本质一样，协向量位置不同

设

\[
\mathbf u=
\begin{bmatrix}
u_1\\
u_2
\end{bmatrix},
\qquad
\mathbf v=
\begin{bmatrix}
v_1\\
v_2
\end{bmatrix},
\qquad
\mathbf v^T=
\begin{bmatrix}
v_1&v_2
\end{bmatrix}
\]

内积中，协向量在左边：

\[
\underbrace{
\begin{bmatrix}
v_1&v_2
\end{bmatrix}
}_{\text{协向量}}
\underbrace{
\begin{bmatrix}
u_1\\
u_2
\end{bmatrix}
}_{\text{向量}}
=
v_1u_1+v_2u_2
\]

外积中，协向量在右边：

\[
\underbrace{
\begin{bmatrix}
u_1\\
u_2
\end{bmatrix}
}_{\text{向量}}
\underbrace{
\begin{bmatrix}
v_1&v_2
\end{bmatrix}
}_{\text{协向量}}
=
\begin{bmatrix}
u_1v_1&u_1v_2\\
u_2v_1&u_2v_2
\end{bmatrix}
=
\left[
\begin{array}{c|c}
v_1\mathbf u&v_2\mathbf u
\end{array}
\right]
\]

因此，内积和外积都是向量与协向量的双线性结合。协向量在左边时，结果收缩成标量；协向量在右边时，结果保留为矩阵。

### 张量积与矩阵乘法

张量积和矩阵乘法，都是同一个双线性结构的不同排布表现。张量积保留各方向之间的全部组合，例如

\[
\mathbf u\otimes\mathbf v
=
u_1v_1\,\mathbf e_1\otimes\mathbf e_1
+
u_1v_2\,\mathbf e_1\otimes\mathbf e_2
+
u_2v_1\,\mathbf e_2\otimes\mathbf e_1
+
u_2v_2\,\mathbf e_2\otimes\mathbf e_2
\]

矩阵乘法则对相接的方向进行线性组合，例如

\[
(AB)_{ij}=\sum_k A_{ik}B_{kj}
\]

两者本质都来自不同方向分量之间的乘积与线性组合，只是张量积保留方向标签，矩阵乘法收缩相接的方向标签。

### 说回转动惯量的例子

因为角动量是向量，所以每一个基本角速度输入对应的输出，也必须是一整个向量。若角动量是标量，一个横向对象

\[
\begin{bmatrix}
I_x&I_y&I_z
\end{bmatrix}
\]

就足够把角速度向量变成标量；但真实的角动量是向量，因此需要三个完整输出向量并排组成惯性张量：

\[
\mathbf I
=
\left[
\begin{array}{c|c|c}
\begin{bmatrix}
I_{xx}\\
I_{yx}\\
I_{zx}
\end{bmatrix}
&
\begin{bmatrix}
I_{xy}\\
I_{yy}\\
I_{zy}
\end{bmatrix}
&
\begin{bmatrix}
I_{xz}\\
I_{yz}\\
I_{zz}
\end{bmatrix}
\end{array}
\right]
\]

于是

\[
\begin{bmatrix}
L_x\\
L_y\\
L_z
\end{bmatrix}
=
\omega_x
\begin{bmatrix}
I_{xx}\\
I_{yx}\\
I_{zx}
\end{bmatrix}
+
\omega_y
\begin{bmatrix}
I_{xy}\\
I_{yy}\\
I_{zy}
\end{bmatrix}
+
\omega_z
\begin{bmatrix}
I_{xz}\\
I_{yz}\\
I_{zz}
\end{bmatrix}
\]

不同方向的角速度分量，对完整角动量向量分别作出贡献。

### 细棒的例子

一根质量为 \(M\)、长度为 \(\ell\) 的均匀理想细棒沿 \(x\) 轴放置，令

\[
I_0=\frac{M\ell^2}{12}
\]

在主轴坐标中，

\[
\mathbf I
=
\begin{bmatrix}
0&0&0\\
0&I_0&0\\
0&0&I_0
\end{bmatrix}
=
\left[
\begin{array}{c|c|c}
\underbrace{
\begin{bmatrix}
0\\
0\\
0
\end{bmatrix}
}_{\text{单位 }x\text{ 角速度的响应}}
&
\underbrace{
\begin{bmatrix}
0\\
I_0\\
0
\end{bmatrix}
}_{\text{单位 }y\text{ 角速度的响应}}
&
\underbrace{
\begin{bmatrix}
0\\
0\\
I_0
\end{bmatrix}
}_{\text{单位 }z\text{ 角速度的响应}}
\end{array}
\right]
\]

因此

\[
\mathbf L
=
\mathbf I\boldsymbol\omega
=
\begin{bmatrix}
0\\
I_0\omega_y\\
I_0\omega_z
\end{bmatrix}
\]

若木棒斜放，惯性张量会出现非对角项。例如二维部分为

\[
\mathbf I
=
I_0
\begin{bmatrix}
\frac12&-\frac12\\
-\frac12&\frac12
\end{bmatrix}
\]

当

\[
\boldsymbol\omega=
\begin{bmatrix}
\omega\\
0
\end{bmatrix}
\]

有

\[
\mathbf L
=
\mathbf I\boldsymbol\omega
=
\begin{bmatrix}
\frac12I_0\omega\\
-\frac12I_0\omega
\end{bmatrix}
\]

所以纯 \(x\) 输入也可以产生 \(y\) 输出，非对角项记录的就是不同方向之间的耦合。

### 扩展

向量微积分可以继续推广为张量微积分，并在流形上讨论。向量微分方程也可以变为张量微分方程。广义相对论中的爱因斯坦场方程就是张量方程：

\[
G_{\mu\nu}+\Lambda g_{\mu\nu}
=
\frac{8\pi G}{c^4}T_{\mu\nu}
\]

左边描述时空几何，右边描述物质与能量。

