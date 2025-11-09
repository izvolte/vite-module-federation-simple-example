# Module Federation 2.0 с Vite + TypeScript + React + Vue

Пример реализации Module Federation 2.0 с использованием Vite, TypeScript, React и Vue. Проект демонстрирует микрофронтенд архитектуру с изолированными приложениями разных фреймворков и общими компонентами.

## Структура проекта

```
vite-micro-front/
├── host/          # Главное приложение (хост) - React
├── remote1/       # Микрофронт 1 - Counter с кнопками - React
├── remote2/       # Микрофронт 2 - Data Display с карточками - React
├── remote3/       # Микрофронт 3 - Todo List - Vue
└── README.md
```

## Архитектура

### Host Application (порт 5000) - React
- **Описание**: Главное приложение, которое загружает и отображает микрофронты
- **Импортирует**:
  - `remote1/App` - приложение счетчика (React)
  - `remote2/App` - приложение отображения данных (React)
  - `remote3/App` - приложение todo list (Vue)
  - `remote1/Button` - компонент кнопки (React, shared)
  - `remote2/Card` - компонент карточки (React, shared)
  - `remote3/Badge` - компонент бейджа (Vue, shared)

### Remote 1 (порт 5001) - React
- **Описание**: Микрофронт с функционалом счетчика
- **Фреймворк**: React 18
- **Экспортирует**:
  - `./App` - приложение счетчика
  - `./Button` - переиспользуемый компонент кнопки

### Remote 2 (порт 5002) - React
- **Описание**: Микрофронт с отображением данных в виде карточек
- **Фреймворк**: React 18
- **Экспортирует**:
  - `./App` - приложение с карточками
  - `./Card` - переиспользуемый компонент карточки

### Remote 3 (порт 5003) - Vue
- **Описание**: Микрофронт с функционалом todo list
- **Фреймворк**: Vue 3
- **Экспортирует**:
  - `./App` - приложение todo list
  - `./Badge` - переиспользуемый компонент бейджа

## Установка зависимостей

Необходимо установить зависимости для каждого приложения отдельно:

```bash
# Host
cd host
npm install

# Remote 1
cd ../remote1
npm install

# Remote 2
cd ../remote2
npm install

# Remote 3
cd ../remote3
npm install
```

## Запуск в режиме разработки

Для работы приложений необходимо запустить все четыре сервера в **отдельных терминалах**:

### Терминал 1 - Remote 1 (React)
```bash
cd remote1
npm run dev
```
Запустится на http://localhost:5001

### Терминал 2 - Remote 2 (React)
```bash
cd remote2
npm run dev
```
Запустится на http://localhost:5002

### Терминал 3 - Remote 3 (Vue)
```bash
cd remote3
npm run dev
```
Запустится на http://localhost:5003

### Терминал 4 - Host (React)
```bash
cd host
npm run dev
```
Запустится на http://localhost:5000

## Порядок запуска

**ВАЖНО**: Сначала запустите все remote приложения (remote1, remote2 и remote3), а затем host приложение. Host зависит от доступности remotes.

## Просмотр результата

После запуска всех четырех приложений откройте в браузере:
- **Host Application**: http://localhost:5000 - основное приложение со всеми микрофронтами
- **Remote 1 (standalone)**: http://localhost:5001 - отдельный запуск микрофронта 1 (React)
- **Remote 2 (standalone)**: http://localhost:5002 - отдельный запуск микрофронта 2 (React)
- **Remote 3 (standalone)**: http://localhost:5003 - отдельный запуск микрофронта 3 (Vue)

## Особенности реализации

### Module Federation 2.0
Используется плагин `@module-federation/vite` для настройки Module Federation с Vite.

### Изоляция приложений
- Каждое приложение имеет собственный `package.json`
- Независимые процессы сборки
- Изолированные зависимости

### Shared зависимости
Фреймворки настроены как singleton shared dependencies для предотвращения дублирования:

**React (в remote1, remote2):**
```typescript
shared: {
  react: {
    singleton: true,
    requiredVersion: '^18.3.1',
  },
  'react-dom': {
    singleton: true,
    requiredVersion: '^18.3.1',
  },
}
```

**Vue (в remote3):**
```typescript
shared: {
  vue: {
    singleton: true,
    requiredVersion: '^3.5.13',
  },
}
```

### TypeScript поддержка
Все remote модули имеют типизацию в `host/src/vite-env.d.ts`:
```typescript
declare module 'remote1/App' {
  const App: React.ComponentType;
  export default App;
}
```

## Сборка для production

```bash
# Собрать remote1
cd remote1
npm run build

# Собрать remote2
cd remote2
npm run build

# Собрать remote3
cd remote3
npm run build

# Собрать host
cd host
npm run build
```

## Технологии

- **Vite** - Сборщик и dev-сервер
- **React 18** - UI библиотека (host, remote1, remote2)
- **Vue 3** - UI фреймворк (remote3)
- **TypeScript** - Типизация
- **@module-federation/vite** - Module Federation 2.0 для Vite

## Особенности cross-framework интеграции

Проект демонстрирует уникальную возможность Module Federation работать с разными фреймворками:
- **Host приложение (React)** успешно загружает и отображает Vue компоненты из remote3
- **Vue компоненты** автоматически адаптируются для использования в React через Module Federation
- Каждый фреймворк изолирован в своем микрофронте и не конфликтует с другими

## Примеры использования

### Импорт целого приложения
```typescript
const Remote1App = React.lazy(() => import('remote1/App'));
```

### Импорт отдельного компонента
```typescript
const Button = React.lazy(() => import('remote1/Button'));
```

### Использование компонента
```typescript
<Suspense fallback={<div>Loading...</div>}>
  <Button onClick={() => alert('Clicked!')} variant="primary">
    Click me
  </Button>
</Suspense>
```

### Импорт Vue компонента в React приложение
```typescript
// @ts-ignore - Vue component from remote3
const Badge = React.lazy(() => import('remote3/Badge'));

// Использование
<Suspense fallback={<div>Loading...</div>}>
  <Badge count={5} label="Vue" color="green" />
</Suspense>
```

## Возможные проблемы

### CORS ошибки
Убедитесь, что в конфигурации Vite включен CORS:
```typescript
server: {
  cors: true,
}
```

### Remote не загружается
1. Проверьте, что remote приложение запущено
2. Проверьте правильность URL в конфигурации host
3. Откройте консоль браузера для просмотра ошибок

### TypeScript ошибки
Убедитесь, что все module declarations добавлены в `vite-env.d.ts`

## Дополнительная информация

- [Module Federation Documentation](https://module-federation.io/)
- [Vite Documentation](https://vitejs.dev/)
- [@module-federation/vite](https://www.npmjs.com/package/@module-federation/vite)
