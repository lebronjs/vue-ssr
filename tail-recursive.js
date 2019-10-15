/** promise是异步编程的一种解决方案 */
/** 所以我一开始想通过promise race比较普通斐波那契和应用了尾递归斐波那契这两者之前的运行时间，因为都是同步代码所以并不会一个个输出 */

let num = process.argv[2]

let fabo_p = new Promise(function(resolve, reject) {
	function fabo(n) {
		if (n <= 1) {
			return 1
		} else {
			return fabo(n - 1) + fabo(n - 2)
		}
	}
	console.time('no-tail:')
	resolve([fabo(num), 'no-tail:'])
})
// .then(result => {
// 	console.log(result)
// 	console.timeEnd('no-tail:')
// })

let tail_fabo_p = new Promise(function(resolve, reject) {
	function tail_fabo(n, sum1 = 1, sum2 = 1) {
		if (n <= 1) {
			return sum2
		} else {
			return tail_fabo(n - 1, sum2, sum1 + sum2)
		}
	}
	console.time('tail:')
	resolve([tail_fabo(num), 'tail:'])
}).then(result => {
	console.log(result)
	console.timeEnd('tail:')
})

// Promise.race([tail_fabo_p, fabo_p]).then(result => {
// 	console.log(result)
// 	console.timeEnd(result[1])
// })
