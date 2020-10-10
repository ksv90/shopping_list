// @generated: @expo/next-adapter@2.1.5
import { StyleSheet, Text, View } from 'react-native'
import Router from 'next/router'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function App() {
	const [loading, setLoading] = useState(false)

	const handleClick = () => {
		setLoading(true)
		Router.push('/main')
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Привет 👋</Text>
			{loading ? (
				<CircularProgress size={20} color='secondary' />
			) : (
				<p>
					<Button onClick={handleClick} variant='contained' color='primary'>
						Открыть приложение
					</Button>
				</p>
			)}
			<Text>
				{
					'После нажатия кнопки "Открыть" загрузится небольшое приложение "Список задач" (todo list). Первая загрузка будет занимать немного больше времени, но последующие переходы по ссылкам будут происходить в динамичном режиме без задержки. При первой загрузке откроется стандартный список задач. Задачи можно отмечать как выполненные, с помощью флажка справой стороны. При нажатии на сам элемент открывается контекстное меню, где можно выполнить некоторое количество действий. Задачи также можно добавлять путем нажатия на красную кнопку в правом нижнем углу экрана. Любое действие с приложением автоматически сохраняется и доступно после обновления страницы.'
				}
			</Text>
			<style jsx>{`
				p {
					margin: 20px;
					text-align: center;
				}
			`}</style>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 30,
		padding: 10,
	},
})
