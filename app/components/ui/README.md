# UI Components

This directory contains reusable UI components for the application.

## Dropdown Component

A reusable dropdown component with customizable options and styling.

### Props

- `title?: string` - Optional label above the dropdown
- `placeholder: string` - Placeholder text when no option is selected
- `options: DropdownOption[]` - Array of options with value and label
- `value: string` - Currently selected value
- `onChange: (value: string) => void` - Callback when selection changes
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Whether the dropdown is disabled
- `minWidth?: string` - Minimum width of the dropdown (default: '140px')
- `showAllOption?: boolean` - Whether to show "All" option (default: true)
- `allOptionLabel?: string` - Label for the "All" option (default: 'All')

### Usage Example

```tsx
import { Dropdown } from '../components/ui';

<Dropdown
  placeholder="Select Status"
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]}
  value={status}
  onChange={setStatus}
  allOptionLabel="All Status"
/>
```

### Features

- Click outside to close
- Keyboard accessible
- Customizable styling
- Optional "All" option
- Disabled state support
- Responsive design

---

## Input Component

A reusable input component with customizable styling and features.

### Props

- `title?: string` - Optional label above the input
- `placeholder?: string` - Placeholder text
- `value: string` - Current input value
- `onChange: (value: string) => void` - Change callback
- `type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'` - Input type (default: 'text')
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Whether the input is disabled
- `required?: boolean` - Whether the field is required
- `error?: string` - Error message to display
- `success?: boolean` - Whether to show success state
- `icon?: React.ReactNode` - Optional icon
- `iconPosition?: 'left' | 'right'` - Icon position (default: 'left')
- `minWidth?: string` - Minimum width
- `maxWidth?: string` - Maximum width
- `autoFocus?: boolean` - Auto focus on mount
- `autoComplete?: string` - Autocomplete attribute
- `name?: string` - Input name attribute
- `id?: string` - Input id attribute

### Usage Examples

#### Basic Input
```tsx
import { Input } from '../components/ui';

<Input
  placeholder="Enter your name"
  value={name}
  onChange={setName}
/>
```

#### Input with Icon
```tsx
import { Input } from '../components/ui';
import { Search } from 'lucide-react';

<Input
  placeholder="Search..."
  value={searchQuery}
  onChange={setSearchQuery}
  icon={<Search className="h-4 w-4" />}
  iconPosition="left"
/>
```

#### Input with Title and Error
```tsx
<Input
  title="Email Address"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
  type="email"
  required
  error={emailError}
/>
```

#### Input with Success State
```tsx
<Input
  title="Username"
  placeholder="Enter username"
  value={username}
  onChange={setUsername}
  success={isUsernameValid}
/>
```

### Features

- Forwarded ref support
- Multiple input types
- Icon support (left/right positioning)
- Error and success states
- Required field indication
- Disabled state
- Auto focus support
- Autocomplete support
- Responsive design
- Accessible labels
- Smooth transitions and hover effects 