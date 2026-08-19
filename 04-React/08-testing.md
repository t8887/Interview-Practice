# Testing — React Testing Library / Jest

> Extracted from `12-Company/citiustech-L1-interview-prep.md` (§8.3 "Performance & Testing") during `/prep-restructure` (2026-08-19) — confirmed via `/prep-analyze` as content that was misfiled in a company-specific prep file instead of the topic folder it belongs to (`_meta/INVENTORY.md` Misfiled section). Content unchanged from the source; only location and surrounding cross-links are new.

**Must know:**
- `React.memo` for preventing unnecessary re-renders
- Lazy loading and code splitting
- Basic testing with Jest/React Testing Library
- Performance profiling tools (React DevTools Profiler)

**Expected difficulty:** Medium

## `React.memo` to prevent re-renders

```jsx
// Without memo: UserCard re-renders even if props haven't changed
function UserCard({ user }) {
  return <div>{user.name} - {user.email}</div>;
}

// With memo: UserCard only re-renders if user prop changes
const UserCard = React.memo(function UserCard({ user }) {
  return <div>{user.name} - {user.email}</div>;
});

function UserList({ users }) {
  const [filter, setFilter] = useState('');

  return (
    <>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {users.map(user => <UserCard key={user.id} user={user} />)} {/* Only re-renders if user prop changes */}
    </>
  );
}
```

## Testing a component with React Testing Library

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from './UserForm';

test('should submit form with user data', () => {
  render(<UserForm onSubmit={jest.fn()} />);

  const nameInput = screen.getByPlaceholderText(/name/i);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(nameInput, { target: { value: 'Onkar' } });
  fireEvent.change(emailInput, { target: { value: 'onkar@example.com' } });
  fireEvent.click(submitButton);

  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

## Interview Tips

- **Show component thinking:** "I break down the UI into reusable, composable components"
- **Mention performance:** "For the EY Risk.ai dashboard, we used React.memo and useMemo to optimize rendering of charts with large datasets"
- **Explain trade-offs:** "Context API is great for small to medium apps, but for large apps with complex state, Redux/Zustand might be better"
- **Demonstrate testing mindset:** "I write tests for critical components using React Testing Library"

## Related
[`03-memoization-performance.md`](./03-memoization-performance.md) (the `React.memo` example above is the same pattern taught in more depth there — this file's value is the RTL testing example, not a second memoization lesson). [`01-hooks-deep-dive.md`](./01-hooks-deep-dive.md) (mentions `eslint-plugin-react-hooks` as the tooling that would catch stale-closure bugs a test suite like this one is also positioned to catch).

## Exercises
1. Write an RTL test for a controlled component's *invalid*-input path (e.g., the email field above with a malformed address) — this file only tests the happy path.
2. Add a test using `userEvent` (the more realistic successor to `fireEvent` for simulating user interaction) and explain the practical difference between the two.
3. Write one test for a custom hook using `@testing-library/react-hooks`'s `renderHook` — testing hooks in isolation is a natural follow-up this file doesn't cover.
