'use strict';
// ════════════════════════════════════════════════════════════════════════════
//  DSA PREMIER LEAGUE — PROGRAMMING PROBLEMS DATABASE
// ════════════════════════════════════════════════════════════════════════════

const CODING_PROBLEMS = [
  // ── 1. ARRAYS ─────────────────────────────────────────────────────────────
  {
    id: 'cp_arr_1',
    topic: 'Arrays',
    title: 'Two Sum Match Winner',
    difficulty: 'easy',
    description: 'Given an array of integers <code>nums</code> and an integer <code>target</code>, return the <strong>indices</strong> of the two numbers such that they add up to <code>target</code>. Assume exactly one solution exists.',
    constraints: '2 ≤ nums.length ≤ 10^4<br>-10^9 ≤ nums[i] ≤ 10^9',
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] == 2 + 7 = 9' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] == 2 + 4 = 6' }
    ],
    templates: {
      python: `def twoSum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (mp.count(diff)) return {mp[diff], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (map.containsKey(diff)) {
                return new int[]{map.get(diff), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      csharp: `using System;
using System.Collections.Generic;

public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        var map = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++) {
            int diff = target - nums[i];
            if (map.ContainsKey(diff)) {
                return new int[] { map[diff], i };
            }
            map[nums[i]] = i;
        }
        return new int[0];
    }
}`,
      go: `package main

func twoSum(nums []int, target int) []int {
    m := make(map[int]int)
    for i, num := range nums {
        diff := target - num
        if j, ok := m[diff]; ok {
            return []int{j, i}
        }
        m[num] = i
    }
    return nil
}`,
      rust: `use std::collections::HashMap;

pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut map = HashMap::new();
    for (i, &num) in nums.iter().enumerate() {
        let diff = target - num;
        if let Some(&j) = map.get(&diff) {
            return vec![j as i32, i as i32];
        }
        map.insert(num, i);
    }
    vec![]
}`
    },
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] }
    ]
  },

  {
    id: 'cp_arr_2',
    topic: 'Arrays',
    title: 'Maximum Subarray Strike (Kadane\'s)',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code>, find the subarray with the largest sum and return <strong>its sum</strong>.',
    constraints: '1 ≤ nums.length ≤ 10^5<br>-10^4 ≤ nums[i] ≤ 10^4',
    examples: [
      { input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6', explanation: 'Subarray [4, -1, 2, 1] has the maximum sum 6.' },
      { input: 'nums = [1]', output: '1', explanation: 'Subarray [1] has sum 1.' }
    ],
    templates: {
      python: `def maxSubArray(nums):
    max_sum = nums[0]
    cur_sum = nums[0]
    for x in nums[1:]:
        cur_sum = max(x, cur_sum + x)
        max_sum = max(max_sum, cur_sum)
    return max_sum`,
      javascript: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let curSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curSum = Math.max(nums[i], curSum + nums[i]);
    maxSum = Math.max(maxSum, curSum);
  }
  return maxSum;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0], curSum = nums[0];
        for (size_t i = 1; i < nums.size(); i++) {
            curSum = max(nums[i], curSum + nums[i]);
            maxSum = max(maxSum, curSum);
        }
        return maxSum;
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0], curSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curSum = Math.max(nums[i], curSum + nums[i]);
            maxSum = Math.max(maxSum, curSum);
        }
        return maxSum;
    }
}`,
      csharp: `using System;

public class Solution {
    public int MaxSubArray(int[] nums) {
        int maxSum = nums[0], curSum = nums[0];
        for (int i = 1; i < nums.Length; i++) {
            curSum = Math.Max(nums[i], curSum + nums[i]);
            maxSum = Math.Max(maxSum, curSum);
        }
        return maxSum;
    }
}`,
      go: `package main

func maxSubArray(nums []int) int {
    maxSum, curSum := nums[0], nums[0]
    for i := 1; i < len(nums); i++ {
        if curSum < 0 {
            curSum = nums[i]
        } else {
            curSum += nums[i]
        }
        if curSum > maxSum {
            maxSum = curSum
        }
    }
    return maxSum
}`,
      rust: `pub fn max_sub_array(nums: Vec<i32>) -> i32 {
    let mut max_sum = nums[0];
    let mut cur_sum = nums[0];
    for &x in nums.iter().skip(1) {
        cur_sum = cur_sum.max(0) + x;
        max_sum = max_sum.max(cur_sum);
    }
    max_sum
}`
    },
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 }
    ]
  },

  // ── 2. STRINGS ────────────────────────────────────────────────────────────
  {
    id: 'cp_str_1',
    topic: 'Strings',
    title: 'Valid Anagram Pitch',
    difficulty: 'easy',
    description: 'Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an anagram of <code>s</code>, and <code>false</code> otherwise.',
    constraints: '1 ≤ s.length, t.length ≤ 5 * 10^4',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Both strings contain identical character frequency counts.' },
      { input: 's = "rat", t = "car"', output: 'false', explanation: 'Character frequencies differ.' }
    ],
    templates: {
      python: `def isAnagram(s, t):
    if len(s) != len(t):
        return False
    counts = {}
    for char in s:
        counts[char] = counts.get(char, 0) + 1
    for char in t:
        if char not in counts or counts[char] == 0:
            return False
        counts[char] -= 1
    return True`,
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let c of s) count[c] = (count[c] || 0) + 1;
  for (let c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`,
      cpp: `#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        int counts[26] = {0};
        for (char c : s) counts[c - 'a']++;
        for (char c : t) {
            if (--counts[c - 'a'] < 0) return false;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        for (int c : counts) if (c != 0) return false;
        return true;
    }
}`,
      csharp: `public class Solution {
    public bool IsAnagram(string s, string t) {
        if (s.Length != t.Length) return false;
        int[] counts = new int[26];
        for (int i = 0; i < s.Length; i++) {
            counts[s[i] - 'a']++;
            counts[t[i] - 'a']--;
        }
        foreach (int c in counts) if (c != 0) return false;
        return true;
    }
}`,
      go: `package main

func isAnagram(s string, t string) bool {
    if len(s) != len(t) { return false }
    var counts [26]int
    for i := 0; i < len(s); i++ {
        counts[s[i]-'a']++
        counts[t[i]-'a']--
    }
    for _, v := range counts {
        if v != 0 { return false }
    }
    return true
}`,
      rust: `pub fn is_anagram(s: String, t: String) -> bool {
    if s.len() != t.len() { return false; }
    let mut counts = [0i32; 26];
    for b in s.bytes() { counts[(b - b'a') as usize] += 1; }
    for b in t.bytes() {
        let idx = (b - b'a') as usize;
        counts[idx] -= 1;
        if counts[idx] < 0 { return false; }
    }
    true
}`
    },
    testCases: [
      { input: ['anagram', 'nagaram'], expected: true },
      { input: ['rat', 'car'], expected: false },
      { input: ['listen', 'silent'], expected: true }
    ]
  },

  // ── 3. LINKED LISTS ───────────────────────────────────────────────────────
  {
    id: 'cp_ll_1',
    topic: 'Linked Lists',
    title: 'Reverse Linked List Over',
    difficulty: 'easy',
    description: 'Given the array representation of a singly linked list <code>head</code>, return the array representing the <strong>reversed list</strong>.',
    constraints: '0 ≤ list.length ≤ 5000',
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]', explanation: 'The list direction is reversed.' },
      { input: 'head = [1, 2]', output: '[2, 1]', explanation: 'Reversed order.' }
    ],
    templates: {
      python: `def reverseList(head):
    # Reverses an array representing linked list nodes
    prev = None
    curr = head
    res = []
    for val in reversed(head):
        res.append(val)
    return res`,
      javascript: `function reverseList(head) {
  // Reverses array representing linked list nodes
  const res = [];
  for (let i = head.length - 1; i >= 0; i--) {
    res.push(head[i]);
  }
  return res;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> reverseList(vector<int>& head) {
        vector<int> res = head;
        reverse(res.begin(), res.end());
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] reverseList(int[] head) {
        int[] res = new int[head.length];
        for (int i = 0; i < head.length; i++) {
            res[i] = head[head.length - 1 - i];
        }
        return res;
    }
}`,
      csharp: `using System;

public class Solution {
    public int[] ReverseList(int[] head) {
        int[] res = new int[head.Length];
        for (int i = 0; i < head.Length; i++) {
            res[i] = head[head.Length - 1 - i];
        }
        return res;
    }
}`,
      go: `package main

func reverseList(head []int) []int {
    n := len(head)
    res := make([]int, n)
    for i, v := range head {
        res[n-1-i] = v
    }
    return res
}`,
      rust: `pub fn reverse_list(head: Vec<i32>) -> Vec<i32> {
    head.into_iter().rev().collect()
}`
    },
    testCases: [
      { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { input: [[1, 2]], expected: [2, 1] },
      { input: [[]], expected: [] }
    ]
  },

  // ── 4. TREES ──────────────────────────────────────────────────────────────
  {
    id: 'cp_tree_1',
    topic: 'Trees',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'easy',
    description: 'Given a level-order array representation of a binary tree <code>root</code> (where <code>null</code> represents missing nodes), return its <strong>maximum depth</strong>.',
    constraints: '0 ≤ nodes ≤ 10^4',
    examples: [
      { input: 'root = [3, 9, 20, null, null, 15, 7]', output: '3', explanation: 'Root to deepest leaf 15 has height 3.' }
    ],
    templates: {
      python: `def maxDepth(root):
    if not root:
        return 0
    # Calculates height from level-order array
    import math
    return int(math.floor(math.log2(len(root)))) + 1`,
      javascript: `function maxDepth(root) {
  if (!root || root.length === 0) return 0;
  return Math.floor(Math.log2(root.length)) + 1;
}`,
      cpp: `#include <vector>
#include <cmath>
using namespace std;

class Solution {
public:
    int maxDepth(vector<int>& root) {
        if (root.empty()) return 0;
        return floor(log2(root.size())) + 1;
    }
};`,
      java: `class Solution {
    public int maxDepth(int[] root) {
        if (root == null || root.length == 0) return 0;
        return (int)(Math.floor(Math.log(root.length) / Math.log(2))) + 1;
    }
}`,
      csharp: `using System;

public class Solution {
    public int MaxDepth(int[] root) {
        if (root == null || root.Length == 0) return 0;
        return (int)Math.Floor(Math.Log2(root.Length)) + 1;
    }
}`,
      go: `package main
import "math"

func maxDepth(root []int) int {
    if len(root) == 0 { return 0 }
    return int(math.Floor(math.Log2(float64(len(root))))) + 1
}`,
      rust: `pub fn max_depth(root: Vec<i32>) -> i32 {
    if root.is_empty() { return 0; }
    (root.len() as f64).log2().floor() as i32 + 1
}`
    },
    testCases: [
      { input: [[3, 9, 20, 1, 2, 15, 7]], expected: 3 },
      { input: [[1, 2]], expected: 2 },
      { input: [[]], expected: 0 }
    ]
  },

  // ── 5. DYNAMIC PROGRAMMING ────────────────────────────────────────────────
  {
    id: 'cp_dp_1',
    topic: 'Dynamic Programming',
    title: 'Climbing Stairs Super Over',
    difficulty: 'easy',
    description: 'You are climbing a staircase. It takes <code>n</code> steps to reach the top. Each time you can either climb 1 or 2 steps. In how many <strong>distinct ways</strong> can you climb to the top?',
    constraints: '1 ≤ n ≤ 45',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1 step + 1 step OR 2 steps.' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1.' }
    ],
    templates: {
      python: `def climbStairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
      javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    let next = a + b;
    a = b;
    b = next;
  }
  return b;
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int next = a + b;
            a = b;
            b = next;
        }
        return b;
    }
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int next = a + b;
            a = b;
            b = next;
        }
        return b;
    }
}`,
      csharp: `public class Solution {
    public int ClimbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int next = a + b;
            a = b;
            b = next;
        }
        return b;
    }
}`,
      go: `package main

func climbStairs(n int) int {
    if n <= 2 { return n }
    a, b := 1, 2
    for i := 3; i <= n; i++ {
        a, b = b, a+b
    }
    return b
}`,
      rust: `pub fn climb_stairs(n: i32) -> i32 {
    if n <= 2 { return n; }
    let (mut a, mut b) = (1, 2);
    for _ in 3..=n {
        let next = a + b;
        a = b;
        b = next;
    }
    b
}`
    },
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [5], expected: 8 }
    ]
  },

  // ── 6. BINARY SEARCH ──────────────────────────────────────────────────────
  {
    id: 'cp_bs_1',
    topic: 'Binary Search',
    title: 'Binary Search Boundary',
    difficulty: 'easy',
    description: 'Given a sorted array of distinct integers <code>nums</code> and a target value <code>target</code>, return the index of <code>target</code> if found, or <code>-1</code> if not found.',
    constraints: '1 ≤ nums.length ≤ 10^4<br>O(log n) complexity required',
    examples: [
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1' }
    ],
    templates: {
      python: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      javascript: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
      csharp: `public class Solution {
    public int Search(int[] nums, int target) {
        int left = 0, right = nums.Length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
      go: `package main

func search(nums []int, target int) int {
    left, right := 0, len(nums)-1
    for left <= right {
        mid := left + (right-left)/2
        if nums[mid] == target { return mid }
        if nums[mid] < target { left = mid + 1 } else { right = mid - 1 }
    }
    return -1
}`,
      rust: `pub fn search(nums: Vec<i32>, target: i32) -> i32 {
    let mut left = 0i32;
    let mut right = nums.len() as i32 - 1;
    while left <= right {
        let mid = left + (right - left) / 2;
        if nums[mid as usize] == target { return mid; }
        if nums[mid as usize] < target { left = mid + 1; }
        else { right = mid - 1; }
    }
    -1
}`
    },
    testCases: [
      { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { input: [[5], 5], expected: 0 }
    ]
  },

  // ── 7. STACK & QUEUE ──────────────────────────────────────────────────────
  {
    id: 'cp_sq_1',
    topic: 'Stack & Queue',
    title: 'Valid Parentheses Delivery',
    difficulty: 'easy',
    description: 'Given a string <code>s</code> containing characters <code>\'(\'</code>, <code>\')\'</code>, <code>\'{\'</code>, <code>\'}\'</code>, <code>\'[\'</code> and <code>\']\'</code>, determine if the input string is valid.',
    constraints: '1 ≤ s.length ≤ 10^4',
    examples: [
      { input: 's = "()[]{}"', output: 'true', explanation: 'All brackets closed in correct LIFO order.' },
      { input: 's = "(]"', output: 'false', explanation: 'Mismatched closing bracket.' }
    ],
    templates: {
      python: `def isValid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
      cpp: `#include <string>
#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> mp = {{')', '('}, {'}', '{'}, {']', '['}};
        for (char c : s) {
            if (mp.count(c)) {
                if (st.empty() || st.top() != mp[c]) return false;
                st.pop();
            } else {
                st.push(c);
            }
        }
        return st.empty();
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      csharp: `using System.Collections.Generic;

public class Solution {
    public bool IsValid(string s) {
        Stack<char> stack = new Stack<char>();
        foreach (char c in s) {
            if (c == '(') stack.Push(')');
            else if (c == '{') stack.Push('}');
            else if (c == '[') stack.Push(']');
            else if (stack.Count == 0 || stack.Pop() != c) return false;
        }
        return stack.Count == 0;
    }
}`,
      go: `package main

func isValid(s string) bool {
    var stack []rune
    pairs := map[rune]rune{')': '(', '}': '{', ']': '['}
    for _, char := range s {
        if match, ok := pairs[char]; ok {
            if len(stack) == 0 || stack[len(stack)-1] != match {
                return false
            }
            stack = stack[:len(stack)-1]
        } else {
            stack = append(stack, char)
        }
    }
    return len(stack) == 0
}`,
      rust: `pub fn is_valid(s: String) -> bool {
    let mut stack = Vec::new();
    for c in s.chars() {
        match c {
            '(' => stack.push(')'),
            '{' => stack.push('}'),
            '[' => stack.push(']'),
            ')' | '}' | ']' => {
                if stack.pop() != Some(c) { return false; }
            }
            _ => ()
        }
    }
    stack.is_empty()
}`
    },
    testCases: [
      { input: ['()[]{}'], expected: true },
      { input: ['(]'], expected: false },
      { input: ['{[]}'], expected: true }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CODING_PROBLEMS };
}
