// import React, { Fragment, useEffect, useState } from "react";
// import axios from "axios";

// var userEmail = "Thor-Toofan ka devta"
// var registrantToken = ''
// var zakToken = ''
// var leaveUrl = `http://localhost:3000`
// const antIcon = <LoadingOutlined />;
// const MeetingComponent= () => {
//     useEffect(async () => {
//         getSignature();
//     }, []);
//     const getSignature = async () => {
//         await axios({
//             method: 'get',
//             url: `http://localhost:8000/api/meeting/authorize`,
//             data: { meeting_no: 12345678901, role: 0 }, // 0 = participant, 1 = host.
//             headers: {
//                 Authorization: "your auth token here"
//             }
//         }).then(res => {
//             const data = res.data.data;
//             initMeeting(data);
//         }).catch((err) => {
//             console.log(err)
//         })
//     }
//     const initMeeting = async (data) => {
//         const { ZoomMtg } = await import('@zoomus/websdk');
//         ZoomMtg.setZoomJSLib('https://source.zoom.us/2.16.0/lib', '/av');
//         ZoomMtg.preLoadWasm();
//         ZoomMtg.prepareWebSDK();
//         // loads language files, also passes any error messages to the ui
//         ZoomMtg.i18n.load('en-US');
//         ZoomMtg.i18n.reload('en-US');
//         ZoomMtg.init({
//             leaveUrl: leaveUrl,
//             success: (success) => {
//                 ZoomMtg.join({
//                     signature: data.token,
//                     sdkKey: data.sdkKey,
//                     meetingNumber: data.meeting_no,
//                     passWord: data.password,
//                     userName: userName,
//                     userEmail: userEmail,
//                     tk: registrantToken,
//                     zak: zakToken,
//                     success: (success) => {
//                         console.log(success)
//                     },
//                     error: (error) => {
//                         console.log(error)
//                     }
//                 })
//             },
//             error: (error) => {
//                 console.log(error)
//             }
//         })
//     }
//     return (<Fragment> </Fragment>
//     );
// }
// export default ZoomMeteingView;