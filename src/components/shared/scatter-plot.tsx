import React from 'react'
import { Center, Heading, Text } from '@chakra-ui/react'
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    CartesianGrid,
    XAxis,
    YAxis,
    ReferenceLine,
    Tooltip,
} from 'recharts'

interface Props {
    feature: string
    average: number
    description: string
    data: any
    fill: string
}

const ScatterPlot: React.FC<Props> = ({
    feature,
    average,
    description,
    data,
    fill,
}) => {
    let nums = ''
    data.forEach(item => (nums = nums + ',' + item.y))
    return (
        <Center flexDirection="column" mb={10}>
            <Heading size="md" textAlign="center" mb={1}>
                {feature}
            </Heading>
            <Text textAlign="center" mb={5}>
                {description}
            </Text>
            <ResponsiveContainer width={'100%'} height={500}>
                <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" name="Ranking" />
                    <YAxis dataKey="y" name="Confidence" />
                    <ReferenceLine
                        y={average}
                        label="Average"
                        stroke="red"
                        strokeDasharray="3 3"
                    />
                    <Tooltip />
                    <Scatter name={feature} data={data} fill={fill} />
                </ScatterChart>
            </ResponsiveContainer>
        </Center>
    )
}

export default ScatterPlot
