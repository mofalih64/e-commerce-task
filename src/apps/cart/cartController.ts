import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import type { Handler } from 'express';
// import { createsession } from '../../utils/utils'
// var genuuid = require('uuid/v4');


// const express = require('express')
// const {}= prisma
// const {item,cart}=new prisma()

export const createCart: Handler = async (
    req,
    res
) => {

    try {


        const un_ordred_items = await prisma.item.findMany({
            where: {
                userId: req.body.userId,
                ordered: false
            }
        })
        // console.log(un_ordred_items)
        if (un_ordred_items) {
            console.log(`${req.body.peoductId} product iddddd`)

            if (req.body.productId) {
                let new_cart = await prisma.cart.create({
                    data: {
                        userId: req.body.userId,
                        ordered: false,
                        items: {
                            create: {
                                userId: req.body.userId,
                                quantity: 1,
                                ordered: true,
                                productId: req.body.productId

                            }
                        }

                    }
                }
                )

                console.log(`${new_cart} new cartsssss `)
            }
            res.status(201).json({
                message: "success"
            })

        }
    }

    catch (error) {
        if (error instanceof Error) {

            console.log(error.message)
        }
    }
}

// export const getCarts: Handler = async (
//     req,
//     res
// ) => {
//     const carts = await prisma.cart.findMany({
//         include: {
//             items: true,
//         },
//     });
//     res.json(carts)
// }

export const addtocart: Handler = async (
    req,
    res
) => {
    try {
        const { userId } = req.body
        let cartObj: any = await prisma.cart.findFirst({
            where: {
                userId: userId,
                ordered: false
            },
            include: {
                items: true
            },
        })

        // console.log(JSON.stringify(cartObj))

        console.log(`${cartObj.id} _______________`)
        if (cartObj.includes(req.body.peoductId)) {
            // for (let i = 0; i < cartObj.length; i++) {
            // in real world there will be only one cart that has ordered=false
            if (cartObj.peoductId == req.body.producId) {
                cartObj.quantity++

            }
        }
        else {

            let newItem = await prisma.item.create({
                data: {
                    userId,
                    quantity: 1,
                    ordered: true,
                    productId: req.body.productId,
                    cart_id: cartObj.id
                }
            })
        }
        //                     // is there a save method ? 
        //         let toUpdateCart = await prisma.cart.updateMany({
        //             where: {
        //                 userId: userId,
        //                 ordered:false
        //             },

        //         data:{
        //         items:{
        //             update: [

        //             ]
        //         }


        // })
        // // req.body.productId



    } catch (error) {
        if (error instanceof Error) {

            console.log(error.message)
        }


    }
}





        //                     )



        // res.status(201).json({
        //     meessage: "added succesfuly"
        // })






        // }
        //         }
        //     }
        // console.log(JSON.stringify(cartObj.items))
        // console.log(cartObg)


// export const login = async (
//     req: Request,
//     res: Response
// ): Promise<Response<any>> => {
//     return res.json(authService.reshape(req.user as User));
// };
