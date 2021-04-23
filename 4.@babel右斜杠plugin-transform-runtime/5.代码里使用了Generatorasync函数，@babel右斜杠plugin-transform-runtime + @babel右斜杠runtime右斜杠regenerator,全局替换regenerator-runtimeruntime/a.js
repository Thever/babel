//  写一个 async 函数
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('a1')
    }, 1000)
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('a2')
    }, 2000)
})
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('a3')
    }, 3000)
})

async function jojo(){
    let a = await p
    let a2 = await p2
    let a3 = await p3
    console.log(a+a2+a3)
}
jojo()