import React, { useState, useEffect } from 'react'
import { Select, Upload, Form, Input, Button, message } from 'antd';
import { useCustomContract } from '@/hooks/useContract';
import { useAccount } from 'wagmi'
import { useAuthentication } from '@/hooks/useAuthentication';
import ABI from 'Abi/contract.json'
import { useCreateTeam } from '@/hooks/useCreateTeam';

const ApplyConnected = () => {
    const { address } = useAccount()
    const { contract, signer } = useCustomContract('0x55A682cCc2f091F44f1672DAAa7f1151cD3620e8', ABI)
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values) => {
        messageApi.open({
            type: 'loading',
            content: 'Action in progress..',
            duration: 0,
        });
        if(localStorage.getItem('Authorizationn')===null){
            await useAuthentication(address ,signer)
        }
        

        // contract.registerCandidate(values.trace, address).then(
        //     async Tx => {
        //         await Tx.wait()
        //         console.log(Tx.hash);
        //         if(Global.authorization===undefined){
        //             await useAuthentication(address , signer)

        //             console.log(Global.authorization);
        //         }


        //         // getTeamId(Tx.hash)
        //     }
        // )
        // useCreateTeam().then(

        // )
    };
    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    // const getTeamId = (hash) => {
    //     provider.getTransactionReceipt(hash).then(
    //         data => {
    //             const Hex = data.logs[0].data;
    //             const firstParam = ethers.utils.hexDataSlice(Hex, 0, 32)
    //             const bn = BigNumber.from(firstParam)
    //             const result = bn.toNumber()
    //         }
    //     )
    // }
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {contextHolder}
            <Form
                name="basic"
                style={{
                    maxWidth: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    //   alignItems:'center',
                    margin: ' 60px auto',
                    textAlign: 'left'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Logo"
                    name="logo"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your logo!',
                        },
                    ]}
                >
                    <Upload
                        listType="picture-card"
                        onChange={onChange}
                        onPreview={onPreview}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Introduction"
                    name="Introduction"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your introduction!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Trace"
                    name="trace"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your trace!',
                        },
                    ]}
                >
                    <Select
                        defaultValue="select"
                        style={{
                            width: 200,
                        }}
                        options={[
                            {
                                value: '2',
                                label: 'layer2 application',
                            },
                            {
                                value: '3',
                                label: 'public good',
                            },
                            {
                                value: '4',
                                label: 'zero knowledge',
                            }
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="Twitter_url"
                    name="twitter_url"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Telegram_url"
                    name="telegram_url"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Discord_url"
                    name="discord_url"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Banner"
                    name="banner"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 6,
                    }}
                >
                    <Button htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ApplyConnected