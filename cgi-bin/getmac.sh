#!/bin/bash
iface="wlan0" #"enp8s0" #"wlan0"
#iup=`cat /sys/class/net/$iface/operstate`
	
if [ $? -eq 0 ] #&& [ $iup = 'up' ]
then
  mac=`ifconfig $iface | grep $iface | awk {'print $5'}`
  echo "MAC "$mac
fi
