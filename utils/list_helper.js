const totalLikes = (blogs) => {
    if(blogs.length === 0) {
        return 0
    }
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const favouriteBlog = (blogs) => {
    let mostLovedOneLikeCount = blogs[0].likes
    let mostLovedOne = blogs[0]
    for(let i=0; i<blogs.length; i++){
        if(blogs[i].likes >mostLovedOneLikeCount){
            mostLovedOneLikeCount = blogs[i].likes
            mostLovedOne = blogs[i]
        }
    }
    return mostLovedOne
}
const mostBlogs = (blogs) => {
    let mostBlogs = blogs[0].blogs
    let blog = blogs[0]
    console.log(blogs[1].blogs)
    for(let i=0; i<blogs.length; i++){
        if(blogs[i].blogs > mostBlogs){  
            mostBlogs = blogs[i].blogs
            blog = blogs[i]
        }
    }
    return blog
}
const mostLikes = (blogs) => {
    let mostLikedBlogs = blogs[0].likes
    let blog = blogs[0]
    for(let i=0; i<blogs.length; i++){
        if(blogs[i].likes > mostLikedBlogs) {
            mostLikedBlogs = blogs[i].likes
            blog = blogs[i]
        }
    }
    return blog
}
module.exports  = {
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
}
