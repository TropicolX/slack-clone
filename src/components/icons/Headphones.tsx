import React from 'react';

interface HeadphonesProps {
  color: string;
  size?: number;
}

const Headphones = ({ color, size = 20 }: HeadphonesProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="headphones"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M5.094 4.571C3.785 5.825 3 7.444 3 8.966v1.371A3.45 3.45 0 0 1 5.25 9.5h.5c1.064 0 1.75.957 1.75 1.904v5.192c0 .947-.686 1.904-1.75 1.904h-.5c-2.168 0-3.75-1.99-3.75-4.211v-.578q0-.105.005-.211H1.5V8.966c0-2.02 1.024-4.01 2.556-5.478C5.595 2.014 7.711 1 10 1s4.405 1.014 5.944 2.488C17.476 4.956 18.5 6.945 18.5 8.966V13.5h-.005q.005.105.005.211v.578c0 2.221-1.582 4.211-3.75 4.211h-.5c-1.064 0-1.75-.957-1.75-1.904v-5.192c0-.947.686-1.904 1.75-1.904h.5c.864 0 1.635.316 2.25.837V8.966c0-1.522-.785-3.141-2.094-4.395C13.602 3.322 11.844 2.5 10 2.5s-3.602.822-4.906 2.071m9.016 6.508a.5.5 0 0 0-.11.325v5.192c0 .145.05.257.11.325.057.066.109.079.14.079h.5c1.146 0 2.25-1.11 2.25-2.711v-.578C17 12.11 15.896 11 14.75 11h-.5c-.031 0-.083.013-.14.08M3 13.711C3 12.11 4.105 11 5.25 11h.5c.031 0 .083.013.14.08.06.067.11.18.11.324v5.192a.5.5 0 0 1-.11.325c-.057.066-.109.079-.14.079h-.5C4.105 17 3 15.89 3 14.289z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Headphones;