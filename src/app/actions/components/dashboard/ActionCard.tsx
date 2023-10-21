import { Card, Color, Metric, Text } from "@tremor/react";

export default function ActionCard(title: string, information: string, color: Color) {
  <Card className="max-w-xs mx-auto" decoration="top" decorationColor={color}>
    <Text>{title}</Text>
    <Metric>{information}</Metric>
  </Card>
}
