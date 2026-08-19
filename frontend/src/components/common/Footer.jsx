const socialLinks = [
	{
		label: 'X',
		href: 'https://x.com',
	},
	{
		label: 'Facebook',
		href: 'https://www.facebook.com',
	},
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com',
	},
]

const Footer = () => {
	return (
		<footer className='mt-16 border-t bg-muted/30'>
			<div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-7 sm:flex-row'>
				<p className='text-center text-sm text-muted-foreground sm:text-left'>
					&copy; {new Date().getFullYear()} JobPortal. All rights reserved.
				</p>

				<nav aria-label='Social media links'>
					<ul className='flex items-center gap-2'>
						{socialLinks.map(({ label, href }) => (
							<li key={label}>
								<a
									href={href}
									target='_blank'
									rel='noreferrer'
									aria-label={`JobPortal on ${label}`}
									className='flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
								>
									<span className='text-xs font-semibold'>
										{label === 'LinkedIn' ? 'in' : label === 'Facebook' ? '' : 'X'}
									</span>
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</footer>
	)
}

export default Footer
