import { Data, animate, Override, Animatable } from "framer"

const drawerClosed = 0;
const drawerOpen = 167;

const data = Data({ 
    scale: Animatable(1),
    drawerOpen: true
})

const layout = Data({ 
    drawerY: Animatable(drawerClosed),
    xOpacity: Animatable(0)
})

export const Scale: Override = () => {
    return {
        scale: data.scale,
        onTap() {
            data.scale.set(0.6)
            animate.spring(data.scale, 1)
        },
    }
}

export const Drawer: Override = () => {
    return {
        top: layout.drawerY,
    }
}

export const MenuButton: Override = () => {
    return {
        onTap() {
            if (data.drawerOpen) {
                animate.spring(layout.drawerY, drawerClosed, {
                tension: 200,
                friction: 25,
            })
                animate.easeOut(layout.xOpacity, 0, { duration: 0.25 })
                data.drawerOpen = false;
            } else {
                animate.spring(layout.drawerY, drawerOpen, {
                tension: 200,
                friction: 25,
            })
                animate.easeOut(layout.xOpacity, 1, { duration: 0.25 })
                data.drawerOpen = true;
            }
        }
    }
}

export const MenuX: Override = () => {
    return {
        opacity: layout.xOpacity
    }
}