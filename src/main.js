const $siteList = $('.siteList')
const $last = $('.last')
const $search = $('.search')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'C', url: 'https://css-tricks.com/'},
    {logo: 'D', url: 'https://developer.mozilla.org/zh-CN/docs/Web'},
    {logo: 'D', url: 'https://dribbble.com/'},
    {logo: 'G', url: 'https://github.com/'},
    {logo: 'I', url: 'https://www.iconfont.cn/'},
    {logo: 'M', url: 'https://medium.com/'},
    {logo: 'R', url: 'http://www.ruanyifeng.com/blog/'},
    {logo: 'Z', url: 'https://zhengyuan.xyz/'}
]
const simplifyUrl = (url) => {
    return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')//删除/开头的内容
}


const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="logoWrap">
            <div class="logo">${node.logo}</div>
        </div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
            </svg>
        </div>
</li>`)

        $li.insertBefore($last)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.last').on('click', () => {
    let url = window.prompt('请输入网址')
    if (url !== null) {//判断用户输入的url不为空
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({logo: simplifyUrl(url)[0], url: url})
        render()
    }

})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    if ($search.is(":focus") === false) {//判断搜索框未获得焦点
        const key = e.key
        hashMap.forEach(node => {
            if (node.logo.toLowerCase() === key) {
                window.open(node.url)
            }
        })
    }


})