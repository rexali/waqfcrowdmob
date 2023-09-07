// import React from "react";
// import { Pressable, Text, View, StyleSheet, TextInput } from "react-native";
// import Dialog from "react-native-dialog";
// import { addCartData, getCartData, getCarts, getResult, updateCartData } from "../views/carts/cartsSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { showToast } from "../utils/showToast";
// import { getToken } from "../utils/getToken";
// import { getResult, getUser } from "../app/(users)/usersSlice";
// import { writeDesiredValue } from "../utils/writeDesiredValue";

// export const DonateAlert = ({
//     startPay,
//     setAmount,
//     donationsNo,
//     cartData,
// }: { startPay: any, setAmount: any, donationsNo: any, cartData: any }) => {

//     const result = useSelector(getResult);
//     let [show, setShow] = React.useState(false);
//     let [input, setInput] = React.useState('');
//     const dispatch = useDispatch<any>();
//     const user = useSelector(getUser);
//     // const carts = useSelector(getCarts);

//     const handleCancel = () => {
//         setShow(false)
//     };

//     const handlePay = () => {
//         if (input) {
//             setAmount(input);
//             startPay();
//             setShow(false);
//         } else {
//             alert('Enter Amount');
//         }
//     };

//     // const dispatchCartData = async () => {
//     //     dispatch(getCartData(user.userId || await getToken("userId"))).unwrap();
//     // }

//     // const addOrUpdateCart = (newCart: any) => {
//     //     let mapCart = new Map();

//     //     carts.forEach((cart: any, index: any) => {
//     //         mapCart.set(cart.waqfId, cart)
//     //     });

//     //     const cartItem = carts.find((cart: { waqfId: any; price: any; }, index: any) => parseInt(cart.waqfId) === parseInt(newCart.waqfId) && parseInt(cart.price) === parseInt(newCart.price));
//     //     if (cartItem) {
//     //         dispatch(updateCartData({
//     //             cartId: cartItem.cartId,
//     //             quantity: cartItem.quantity + 1
//     //         })).unwrap();
//     //     } else {
//     //         dispatch(addCartData({ ...newCart })).unwrap(); 
//     //     }
//     // };

//     const addToCart = async () => {
//         if (input) {
//             try {
//                 // addOrUpdateCart(
//                 //     {
//                 //         userId: await getToken("userId"),
//                 //         waqfId: cartData.waqfId,
//                 //         category: cartData?.category,
//                 //         price: parseInt(input),
//                 //         quantity: 1
//                 //     }
//                 // );
//                 dispatch(
//                     // addCartData(
//                     // {
//                     //     userId: await getToken("userId"),
//                     //     waqfId: cartData.waqfId,
//                     //     category: cartData?.category,
//                     //     price: parseInt(input),
//                     //     quantity: 1

//                     // })
//                     ).unwrap();

//                 if (result.affectedRows === 1) {
//                     // get the cart data again to update cart
//                     setTimeout(() => {
//                         // dispatchCartData();
//                     }, 500);
//                     showToast("Item added");
//                 }
//                 setShow(false);
//             } catch (error) {
//                 alert(error);
//             }
//         } else {
//             alert('Enter Amount');
//         }

//     }

//     return (
//         <View >
//             <Pressable style={styles.donateBtn} onPress={() => setShow(true)}>
//                 <Text style={styles.donateText}>Donate</Text>
//                 <Text style={{ marginTop: 7 }}>{writeDesiredValue(donationsNo)}</Text>
//             </Pressable>
//             <Dialog.Container visible={show}>
//                 <Dialog.Title>Enter Amount You Want to Donate</Dialog.Title>
//                 {/* <Dialog.Input keyboardType="numeric" onChangeText={setInput} /> */}
//                 <TextInput
//                     style={styles.input}
//                     placeholder="amount"
//                     keyboardType='numeric'
//                     onChangeText={setInput}
//                 />

//                 <Dialog.Button label="Cancel" onPress={handleCancel} style={{ marginRight: 30 }} />
//                 <Dialog.Button label="Add to Cart" onPress={addToCart} />
//                 <Dialog.Button label="Pay Now" onPress={handlePay} />
//             </Dialog.Container>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     donateText: {
//         color: 'white', textAlign: 'center'
//     },
//     donateBtn: {
//         backgroundColor: 'green',
//         width: 80,
//         height: 30,
//         padding: 4,
//         borderRadius: 10
//     },
//     input: {
//         height: 40,
//         margin: 20,
//         borderWidth: 0.5,
//         borderRadius: 10,
//         padding: 10,
//         maxWidth: '100%',
//     },
// })