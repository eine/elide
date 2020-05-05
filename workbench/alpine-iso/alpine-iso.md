- https://wiki.alpinelinux.org/wiki/Creating_an_Alpine_package
- https://wiki.alpinelinux.org/wiki/How_to_make_a_custom_ISO_image
- https://wiki.alpinelinux.org/wiki/Qemu#Live_mode
- https://wiki.alpinelinux.org/wiki/Developer_Documentation

- https://wiki.alpinelinux.org/wiki/Create_UEFI_boot_USB
- https://wiki.alpinelinux.org/wiki/Create_a_Bootable_USB
- https://wiki.alpinelinux.org/wiki/Installation
- https://wiki.alpinelinux.org/wiki/Alpine_setup_scripts

- https://wiki.alpinelinux.org/wiki/Tutorials_and_Howtos

- https://aur.archlinux.org/cgit/aur.git/tree/PKGBUILD?h=yosys


`docker run --rm -itv $(pwd):/work:z -v /tmp/.X11-unix/:/tmp/.X11-unix -e DISPLAY=unix$DISPLAY 11384eb/elide:alpine-run sh`


```
alpine-rescue.conf.mk 

ALPINE_NAME   := alpine-rescue
KERNEL_FLAVOR := grsec
MODLOOP_EXTRA :=

alpine-rescue.packages

alpine-base
bkeymaps
openssh
e2fsprogs
mdadm
lvm2
parted
debootstrap
ntfs-3g
```

---

# [QEMU](https://wiki.archlinux.org/index.php/QEMU)

- Create disk:

`qemu-img create alpine.qcow 2G`

- Launch and boot from cd image:

`qemu-system-x86_64 -cdrom alpine-*.iso -hda alpine.qcow -boot d -net nic -net user -m 256 -localtime`

- Run `setup-alpine`: [[alpinelinux.org/wiki/Alpine_setup_scripts](https://wiki.alpinelinux.org/wiki/Alpine_setup_scripts)]
- Shut down.
- Launch again, and boot from hard disk (image):

`qemu-system-x86_64 -hda alpine.qcow -boot c -net nic -net user -m 1024 -localtime`

- Complete initial configuration and install missing basic packages:

```
setup-xorg-base
apk add -U --no-cache wireless-tools wpa_supplicant openbox xf86-input-mouse xf86-input-keyboard
```

Required on QEMU: `xf86-video-modesetting mesa-dri-swrast` [[alpinelinux.org/wiki/Qemu#Using_Xorg_inside_Qemu](https://wiki.alpinelinux.org/wiki/Qemu#Using_Xorg_inside_Qemu)]


```
qemu-system-x86_64 -hda alpine.qcow -boot c -net nic -net user -m 1024 -localtime -vga std -display gtk
```

---

- http://unix.stackexchange.com/questions/33996/how-to-copy-qemu-raw-images

---

- http://askubuntu.com/questions/95392/how-to-create-a-bootable-system-with-a-squashfs-root
- https://wiki.archlinux.org/index.php/Multiboot_USB_drive
- https://blog.akerl.org/2014/01/30/dock0-minimal-docker-host/

- https://gist.github.com/vinceallenvince/a7611b10f84e61eebdcc

---

# Format USB stick using LVM

http://askubuntu.com/questions/431717/format-usb-stick-using-lvm

Assume your usb is mounted as sdb1 :

Install lvm :

`sudo apt-get install lvm2`

Create physical volume :

`sudo pvcreate /dev/sdb1`

Check if your physical volume is created :

`sudo pvscan`

Create volume group :

`sudo vgcreate "Nameyouwant" /dev/sdb1`

Check volume groups :

`sudo vgscan`

Create logical volume (suppose we will use ext3):

`sudo lvcreate -l 100%FREE -next3 "Nameofvolumegroup"`

Create ext3 partition :

`sudo mkfs.ext3 /dev/nameyouchoose/ext3`

Mount your logical volume :

`sudo mount /dev/seagate/ext3 /pathyouwant`

You can now store your backups.
