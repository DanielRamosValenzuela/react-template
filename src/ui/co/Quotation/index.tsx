'use client';

import { quotationPlans } from '@/mocks/co/quotation.mock';
import { useRouter } from 'next/navigation';
import { Button, Icon, ProductCardFull } from 'tomaco-components';

const CoQuotation = () => {
	const { push } = useRouter();

	return (
		<main className="row">
			<header className="mb40 d-flex col-12 max-width-736 gap-12 align-items-center">
				<Icon iconName="medicine" iconColor="#ffb31a" />
				<h1 className="px-28 text-regular line-height-1-4 letter-spacing-negative-56">
					Selecciona tu plan
				</h1>
			</header>

			<section className="col-12">
				<div className="quotation-grid row gx-0 gx-md-4 gy-4">
					{quotationPlans.map((plan, index) => (
						<div
							className="col-12 col-md-6 col-xl-4 d-flex"
							key={plan.id}
						>
							<div
								className="quotation-card w-100 card-fade-in"
								style={{ '--animation-order': index } as Record<string, string | number>}
							>
								<ProductCardFull
									cardInfo={plan.cardInfo}
									className="w-100"
									companyName={plan.companyName}
									currency={plan.currency}
									discount={plan.discount}
									insuranceIcon="medicine"
									localMontlyPrice={<div className="text-left">{plan.localMonthlyPrice}</div>}
									onClickHire={() => undefined}
									price={plan.price}
									promoTagText={plan.promoTagText}
									recomendedText={plan.recomendedText}
									showActions
									showMoreDetailsButton={false}
									showPromoTag={!!plan.promoTagText}
									showRecomended={!!plan.recomendedText}
									showValueTag={!plan.discount}
									subtitle={plan.subtitle}
									title={plan.title}
								/>
							</div>
						</div>
					))}
				</div>
				<div className="mt40 d-flex flex-column max-width-736">
					<Button
						iconColor="#3E4043"
						iconName="arrow-left"
						iconPosition="left"
						onClick={() => push('/')}
						text="Volver"
						type="button"
						variant="transparent"
					/>
				</div>
			</section>
		</main>
	);
};

export default CoQuotation;