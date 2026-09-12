---
layout: note
title: "哈密顿力学与经典力学推导"
date: 2026-09-12 23:33:39 +0800
excerpt: "Notes on kinetic energy, generalized momentum, Legendre duality, and the derivation of Hamiltonian and classical mechanics."
keywords:
  - Hamiltonian mechanics
  - classical mechanics
  - generalized momentum
  - Legendre duality
  - kinetic energy
permalink: /Notes/hamiltonian-and-classical-mechanics/
---

2026.9.10 动能求导等于动量的思考。

$$
T(v)=\frac12m\langle v^b,v\rangle
$$

$$
T(v+\delta v)=\frac12m\langle (v+\delta v)^b,v+\delta v\rangle
$$

$$
=\frac12m\left(\left(\langle v,v\rangle+2\langle v,\delta v\rangle\right)^b+\langle\delta v,\delta v\rangle\right)
\qquad =\text{高阶小量}
$$

$$
\delta T=m\langle v^b,\delta v\rangle
$$

固定

$$
v=\begin{pmatrix}v_x\\v_y\end{pmatrix},\qquad
\delta v=\begin{pmatrix}\delta v_x\\\delta v_y\end{pmatrix}
$$

$$
\delta T=mv_x\delta v_x+mv_y\delta v_y\qquad \boxed{A}
$$

☆

$$
=p_x\delta v_x+p_y\delta v_y
$$

$$
=(p_x\quad p_y)
\begin{pmatrix}\delta v_x\\\delta v_y\end{pmatrix}
=\delta T:=\langle p,\delta v\rangle
$$

补：

$$
\delta T=\frac{\partial T}{\partial v_x}\delta v_x+\frac{\partial T}{\partial v_y}\delta v_y
$$

$$
\therefore\quad \frac{\partial T}{\partial v_x}=mv_x\qquad
\frac{\partial T}{\partial v_y}=mv_y\qquad \boxed{A}
$$

$$
v_x\to v_x+\delta v_x
$$

$$
v_y\to v_y+\delta v_y
$$

## 广义坐标：

$$
\delta T=p_x\delta v_x+p_y\delta v_y
\qquad x=x(q_1,q_2,\cdots,q_n)
$$

$$
=p_1\delta\dot q_1+p_2\delta\dot q_2
$$

广义速度：

$$
\dot q_1,\ \dot q_2\ \cdots
$$


$$
\delta T=m(\dot x\quad \dot y)
\begin{pmatrix}
\dfrac{\partial x}{\partial q_1}\delta\dot q_1+\dfrac{\partial x}{\partial q_1}\delta\dot q_2\\[6pt]
\dfrac{\partial y}{\partial q_1}\delta\dot q_1+\dfrac{\partial y}{\partial q_1}\delta\dot q_2
\end{pmatrix}
$$

$$
=m(\dot x\quad \dot y)
\begin{pmatrix}
\dfrac{\partial x}{\partial q_1} & \dfrac{\partial x}{\partial q_2}\\[6pt]
\dfrac{\partial y}{\partial q_1} & \dfrac{\partial y}{\partial q_2}
\end{pmatrix}
\begin{pmatrix}\delta\dot q_1\\\delta\dot q_2\end{pmatrix}
$$

$$
=\left(
 m\dot x\frac{\partial x}{\partial q_1}+m\dot y\frac{\partial y}{\partial q_1}\quad
 m\dot x\frac{\partial x}{\partial q_2}+m\dot y\frac{\partial y}{\partial q_2}
\right)
\begin{pmatrix}\delta\dot q_1\\\delta\dot q_2\end{pmatrix}
$$

最初：

$$
\delta T=(p_x\quad p_y)
\begin{pmatrix}\delta\dot x\\\delta\dot y\end{pmatrix}
$$

$$
\therefore\quad
\delta T=(p_1\quad p_2)
\begin{pmatrix}\delta\dot q_1\\\delta\dot q_2\end{pmatrix}
\qquad p_i\text{为广义动量}
$$

### ☆ 至此：广义速度：

$$
\dot x=\frac{\partial x}{\partial q_1}\dot q_1+\frac{\partial x}{\partial q_2}\dot q_2
$$

### 广义动量：

$$
m\dot x\frac{\partial x}{\partial q_1}+m\dot y\frac{\partial y}{\partial q_1}=p_1
$$

代入得

$$
p_1=m\left(\frac{\partial x}{\partial q_1}\dot q_1+\frac{\partial x}{\partial q_2}\dot q_2\right)\frac{\partial x}{\partial q_1}
+m\left(\frac{\partial y}{\partial q_1}\dot q_1+\frac{\partial y}{\partial q_2}\dot q_2\right)\frac{\partial y}{\partial q_1}
$$

$$
=m\left[\left(\frac{\partial x}{\partial q_1}\right)^2+\left(\frac{\partial y}{\partial q_1}\right)^2\right]\dot q_1
+m\left(\frac{\partial x}{\partial q_1}\frac{\partial x}{\partial q_2}
+\frac{\partial y}{\partial q_1}\frac{\partial y}{\partial q_2}\right)\dot q_2
$$

$$
(p_1\quad p_2)=m(\dot q_1\quad\dot q_2)
\begin{pmatrix}
\left(\dfrac{\partial x}{\partial q_1}\right)^2+\left(\dfrac{\partial y}{\partial q_1}\right)^2 &
\dfrac{\partial x}{\partial q_1}\dfrac{\partial x}{\partial q_2}+\dfrac{\partial y}{\partial q_1}\dfrac{\partial y}{\partial q_2}\\[8pt]
\dfrac{\partial x}{\partial q_1}\dfrac{\partial x}{\partial q_2}+\dfrac{\partial y}{\partial q_1}\dfrac{\partial y}{\partial q_2} &
\left(\dfrac{\partial x}{\partial q_2}\right)^2+\left(\dfrac{\partial y}{\partial q_2}\right)^2
\end{pmatrix}
$$


$$
(p_1\quad p_2)=m(\dot q_1\quad\dot q_2)
\begin{pmatrix}g_{11}&g_{12}\\g_{21}&g_{22}\end{pmatrix}
$$

$$
T=\frac12m(\dot q_1\quad\dot q_2)
\begin{pmatrix}
g_{11}(q_1,q_2)&g_{12}(q_1,q_2)\\
g_{21}(q_1,q_2)&g_{22}(q_1,q_2)
\end{pmatrix}
\begin{pmatrix}\dot q_1\\\dot q_2\end{pmatrix}
$$

$$
T=\frac12m\left(g_{11}(\dot q_1)^2+2g_{12}\dot q_1\dot q_2+g_{22}(\dot q_2)^2\right)
$$

$$
\frac{\partial T}{\partial\dot q_1}
=\frac12m\left(g_{11}\dot q_1+2g_{12}\dot q_2\right)
$$

$$
p_1=m\left(g_{11}\dot q_1+g_{12}\dot q_2\right)
$$

$$
\therefore\quad p_1=\frac{\partial T}{\partial\dot q_1}
\qquad \star\ \text{广义动量定义}
$$

## Ver. 4

$$
a^b dx=v^b dv=d\left(\frac12v^2\right)\qquad \boxed{A}
$$


## Legendre对偶：

$$
p=\frac{\partial T}{\partial v}
$$

$$
v=\frac{\partial T^*}{\partial p}
$$

$$
\boxed{
F^b\frac{d(mx)}{dt}=p^b\frac{dp}{dt}
=\frac{d}{dt}\left(\frac12p^2\right)
=\frac12(mv)^2
}
\qquad \text{因为v空间被拉伸m倍}
$$

$$
\therefore\quad /m:=\frac12mv^2
$$

$\boxed{A}$

$$
v^2:=v^bv
$$

$$
\frac{d}{dt}(v^2)
=\frac{d}{dt}(v^bv)
=\frac{dv^b}{dt}v+v^b\frac{dv}{dt}
$$

$$
\therefore\quad \frac{dv}{dt}=a
\quad\longrightarrow\quad
\therefore\quad =a^bv+v^ba
$$

$$
=2v^ba
$$

$$
\therefore\quad \frac{d}{dt}\left(\frac12v^2\right)=v^ba
$$
