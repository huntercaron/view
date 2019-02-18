import { Data, animate, Override, Animatable } from "framer"

const data = Data({ 
    scale: Animatable(1),
    drawerOpen: true
})

const layout = Data({ 
    drawerY: Animatable(-167),
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
                animate.spring(layout.drawerY, -167, {
                tension: 200,
                friction: 25,
            })
                animate.easeOut(layout.xOpacity, 0, { duration: 0.25 })
                data.drawerOpen = false;
            } else {
                animate.spring(layout.drawerY, 0, {
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