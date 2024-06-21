// import { validateUserParams } from "@/lib/api/validators";
// import { connectToDatabase } from "@/lib/db";
// import { User } from "@/models/user";
// import { NextRequest } from "next/server";

// connectToDatabase()

// export async function GET(request: NextRequest) {
//     const searchParams = request.nextUrl.searchParams;

//     const limit = parseInt(searchParams.get('limit') || '0');
//     const offset = parseInt(searchParams.get('offset') || '0')

//     if (limit) {
//         try {
//             const users = await User.find()
//             .sort({createdAt: -1})
//             .skip(offset)
//             .limit(limit);
//             return Response.json({users}, {status: 200});

//         } catch (error) {
//             console.error(error);
//             return Response.json({
//                 error: "Cannot get the list of user from the database: an unknow error occured"
//             },
//             {
//                 status: 500
//             });
//         }
//     }

//     console.error("The limit should be greater than 0");
//     return Response.json({
//         error: "Cannot get the list of user: you should provide a limit greater than 0 in your request"
//     },
//     {
//         status: 400
//     });
// }

// export async function POST(request: NextRequest) {
//     const userData = await request.json();

//     const { error } = validateUserParams(userData)

//     if (!error) {
//         try {
//             const user = new User({...userData})
//             await user.save()
            
//             return Response.json({message: "User registered successfully."}, {status: 201});
//         } catch (error) {
//             console.error(error);
//             return Response.json({
//                 error: "Cannot register the user: an unknow error occured"
//             },
//             {
//                 status: 500
//             });
//         }
//     }

//     return Response.json({error}, {status: 400});
// }
