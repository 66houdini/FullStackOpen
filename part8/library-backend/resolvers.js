const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require("graphql-subscriptions")
const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments() , //booklength,
      authorCount: async () => Author.collection.countDocuments() , //authors.length,
  
      allBooks: async (root, args) => {
        const books = await  Book.find({}).populate("author", {name: 1}).lean()
        return books.map(book => ({...book, author: book.author.name}))
      } ,
  
      /*get the author and total books by the author */
      allAuthors: async (root, args) => {
        const authors = await Author.find({})
        const books = await  Book.find({}).populate("author").lean()
        return authors.map(author => {
          const bookCount = books.filter(book => String(book.author._id) === String(author._id)).length;
          return { ...author.toObject(), bookCount };
        })

      },
      me: (root, args, context) => {
        return context.currentUser
      }
    }, 
    Mutation: {
      addBook: async (root, args, context) => {

          const currentUser = context.currentUser
          const authorExists = await Author.findOne({name: args.author})
          if (!currentUser) {
            throw new GraphQLError("Not authenticated", {
              extensions: {
                code: "Failed"
              }
            })
          }
          if (!authorExists) {
            throw new GraphQLError("Author does not exist", {
              extensions: {
                code: "Failed",
                invalidArgs: args.author
              }
            })
          }
          const book = new Book({...args, author: authorExists._id})
          
                  
            
          try {
            await book.save()
          } catch (error) {
            throw new GraphQLError("Saving book failed", {
              extensions: {
                code: "Failed",
                invalidArgs: args.name,
                error
              }
            })
          }

          pubsub.publish("BOOK_ADDED", {bookAdded: book})
          return book
         
          
      },
      editAuthor: async (root, args) => {

          const author = await Author.findOne({name: args.name})
          author.born = args.setBornTo
          try {
            await author.save()
          } catch(error) {
            throw new GraphQLError("Saving author failed", {
              extensions: {
                code: "Failed",
                invalidArgs: args.name,
                error
              }
            })
          }
          return author
      },
      createUser: async (root, args) => {
        const user = new User({...args})
        return user.save()
        .catch(error => {
          throw new GraphQLError("Saving user failed", {
            extensions: {
              code: "Failed",
              invalidArgs: args.name,
              error
            }
          })
        })
        
      },
      login: async (root, args) => {
        const user = await User.findOne({username: args.username})
        if (!user || args.password !== "secret") {
          throw new GraphQLError("Wrong credentials", {
            extensions: {
              code: "Failed"
            }
          })
        }
  
        const userForToken = {
          username: user.username,
          id: user._id
        }
        return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
      }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator("BOOK_ADDED")
        }
    }
  }

module.exports = resolvers