import dbConnect from "../lib/dbConnect";
import Users from "../models/Users";

export const resolvers = {
    Query: {

        // async viewer(_parent, _args, _context, _info) {
        //   return { id: 1, name: 'Sathnindu Kottage', status: 'cached' }
        // },

        async viewer(_, {ID}) {
            await dbConnect();
            return Users.findById(ID);
        },
        async getUsers(_) {
            await dbConnect();
            return Users.find().sort({_id: -1});
        },
    },
    Mutation: {
        async createUser(_, {userInput: {name, status}}) {
            const createdUser = new Users({
                name: name,
                status: status
            })
            const res = await createdUser.save();
            return {
                id: res.id,
                ...res._doc
            }
        },

        async deleteUser(_, {ID}) {
            await dbConnect();
            const wasDeleted = (await Users.deleteOne({_id: ID})).deletedCount;
            console.log(wasDeleted);
            return wasDeleted;
        },

        async editUser(_, {ID, editUserInput: {name}}) {
            await dbConnect();
            const wasEdited = (await Users.updateOne({_id: ID}, {name: name})).modifiedCount;
            console.log(wasEdited);
            return wasEdited;
        }

    }
}
