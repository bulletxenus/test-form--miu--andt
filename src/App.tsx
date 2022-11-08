import React, { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { LoadingOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';

import { GET_POSITIONS, GET_RELATIONS } from './queries';
import {
    ApplicantIndividualCompanyPosition,
    ApplicantIndividualCompanyRelation,
} from './graphQL/types/graphql';
import {
    ApplicantCompanyKeys,
    AppStyles,
    PositionsQueryType,
    RelationsQueryType,
    Upd,
    getUpdatingCallback,
    Selector,
} from './components';

import './App.css';
import 'antd/dist/antd.css';

const inputValidationRules = {
    required: true,
    max: 10,
    min: 5,
    message: 'Please enter from 5 to 10 symbols',
};

const App: React.FC = () => {
    const [form] = useForm();

    const relationsQueryResults = useQuery<RelationsQueryType>(GET_RELATIONS);
    const positionsQueryResults = useQuery<PositionsQueryType>(GET_POSITIONS);

    const loading = useMemo(
        () => relationsQueryResults.loading || positionsQueryResults.loading,
        [relationsQueryResults, positionsQueryResults]
    );

    const updatePositions = (newValue: ApplicantIndividualCompanyPosition) => {
        const updateCLbk = getUpdatingCallback(
            ApplicantCompanyKeys.ApplicantIndividualCompanyPositions,
            newValue
        );
        positionsQueryResults.updateQuery(updateCLbk as Upd);
    };

    const updateRelations = (newValue: ApplicantIndividualCompanyRelation) => {
        const updateClbk = getUpdatingCallback(
            ApplicantCompanyKeys.ApplicantIndividualCompanyRelations,
            newValue
        );
        relationsQueryResults.updateQuery(updateClbk as Upd);
    };

    const onFinish = useCallback((e: any) => {
        console.log('FINISH', e);
    }, []);

    return (
        <div style={styles.app}>
            {!loading ? (
                <Form
                    form={form}
                    name={'validationForm'}
                    onFinish={onFinish}
                    autoComplete="off"
                    style={styles.form}
                >
                    <Form.Item
                        name="name"
                        label="Enter your name"
                        rules={[inputValidationRules]}
                        initialValue={''}
                    >
                        <Input type={'text'} placeholder="Input name" />
                    </Form.Item>
                    <div style={styles.selectorContainer}>
                        <Form.Item
                            name="relations"
                            label="Company Relations"
                            rules={[{ required: true }]}
                        >
                            <Selector
                                options={
                                    relationsQueryResults.data![
                                        ApplicantCompanyKeys
                                            .ApplicantIndividualCompanyRelations
                                    ]
                                }
                                updateQuery={updateRelations}
                                styles={styles.selector}
                                placeholder={'Choose relation'}
                            />
                        </Form.Item>
                        <Form.Item
                            name="positions"
                            label="Company Positions"
                            rules={[{ required: true }]}
                        >
                            <Selector
                                options={
                                    positionsQueryResults.data![
                                        ApplicantCompanyKeys
                                            .ApplicantIndividualCompanyPositions
                                    ]
                                }
                                updateQuery={updatePositions}
                                styles={styles.selector}
                                placeholder={'Choose position'}
                                multiple
                            />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="description"
                        label="Tell about yourself"
                        rules={[inputValidationRules]}
                    >
                        <TextArea
                            placeholder={'Write about yourself'}
                            showCount
                            style={styles.description}
                        />
                    </Form.Item>
                    <Button
                        type={'primary'}
                        htmlType={'submit'}
                        className={'login-form-button'}
                    >
                        Submit form
                    </Button>
                </Form>
            ) : (
                <LoadingOutlined style={styles.loader} />
            )}
        </div>
    );
};

const styles: AppStyles = {
    app: {
        textAlign: 'center',
        backgroundColor: '#cbcbcb',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 50,
        width: '80%',
    },
    selectorContainer: {
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    selector: { minWidth: 280, width: '100%' },
    description: { height: 120, resize: 'none' },
    loader: { fontSize: 100 },
};

export default App;
