let arr = [],
	n = 20000000
for (let index = 0; index < n; index++) {
	arr.push(index)
}
function forin() {
	let temp = []
	console.time(`for_in(${n}):`)
	for (const key in arr) {
		temp.push(arr[key])
	}
	console.timeEnd(`for_in(${n}):`)
}

function forinOwn() {
	let temp = []
	console.time(`for_in_own(${n}):`)
	for (const key in arr) {
		if (arr.hasOwnProperty) {
			temp.push(arr[key])
		}
	}
	console.timeEnd(`for_in_own(${n}):`)
}

function forof() {
	let temp = []
	console.time(`for_of(${n}):`)
	for (const item of arr) {
		if (arr.hasOwnProperty) {
			temp.push(item)
		}
	}
	console.timeEnd(`for_of(${n}):`)
}

console.log('数组长度：' + n)
forin()
forinOwn()
forof()
